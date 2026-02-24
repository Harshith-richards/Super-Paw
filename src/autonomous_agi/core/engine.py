from __future__ import annotations

import logging
import time
import uuid
from dataclasses import dataclass

from autonomous_agi.agents.registry import build_agents
from autonomous_agi.core.benchmark import BenchmarkEngine
from autonomous_agi.core.priority_queue import TaskPriorityQueue
from autonomous_agi.core.schemas import Objective, Task
from autonomous_agi.memory.store import MemoryStore
from autonomous_agi.messaging.bus import MessageBus
from autonomous_agi.simulation.sandbox import SimulationSandbox

logger = logging.getLogger(__name__)


@dataclass
class EngineConfig:
    continuous_mode: bool = True
    max_cycles: int = 50
    loop_sleep_seconds: float = 0.2


class AutonomousEngine:
    def __init__(self, config: EngineConfig) -> None:
        self.config = config
        self.agents = build_agents()
        self.memory = MemoryStore()
        self.bus = MessageBus()
        self.queue = TaskPriorityQueue()
        self.benchmark = BenchmarkEngine()
        self.sandbox = SimulationSandbox()
        self.objectives: dict[str, Objective] = {}

    def add_objective(self, title: str, priority: int = 5) -> str:
        objective_id = str(uuid.uuid4())
        objective = Objective(objective_id=objective_id, title=title, priority=priority)
        self.objectives[objective_id] = objective
        self.queue.push(Task(task_id=str(uuid.uuid4()), objective_id=objective_id, description=title, priority=priority))
        return objective_id

    def _dispatch(self, task: Task | None) -> None:
        for name, agent in self.agents.items():
            inbox = self.bus.fetch(name)
            output = agent.run(task if name == "orchestrator" else None, inbox)
            for msg in output.emitted_messages:
                self.bus.publish(msg)
            for next_task in output.generated_tasks:
                self.queue.push(next_task)
            self.memory.append_objective_snapshot(
                task.objective_id if task else "system",
                {"agent": name, "summary": output.summary, "success": output.success, "metrics": output.metrics},
            )

    def run(self) -> None:
        cycles = 0
        while cycles < self.config.max_cycles:
            task = self.queue.pop()
            if task is None and not self.config.continuous_mode:
                break
            if task is None:
                simulation = self.sandbox.run("idle_health_check")
                logger.info("Simulation score: %s", simulation.score)
            self._dispatch(task)
            cycles += 1
            time.sleep(self.config.loop_sleep_seconds)
        score = self.benchmark.score([agent.performance_score for agent in self.agents.values()])
        logger.info("System benchmark score: %s", score)
