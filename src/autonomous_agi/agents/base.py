from __future__ import annotations

import logging
import uuid
from abc import ABC, abstractmethod
from typing import Any

from autonomous_agi.core.schemas import AgentOutput, Message, Task

logger = logging.getLogger(__name__)


class BaseAgent(ABC):
    role: str
    goals: list[str]

    def __init__(self, name: str) -> None:
        self.name = name
        self.performance_score = 0.5
        self.strategy_version = 1

    def _log_event(self, event: str, payload: dict[str, Any]) -> None:
        logger.info("%s | %s | %s", self.name, event, payload)

    def _rewrite_strategy(self, feedback: dict[str, float]) -> None:
        delta = feedback.get("quality", 0.0) - feedback.get("risk", 0.0)
        self.performance_score = max(0.0, min(1.0, self.performance_score + delta * 0.1))
        if delta > 0.05:
            self.strategy_version += 1
        self._log_event("strategy_rewrite", {"score": self.performance_score, "version": self.strategy_version})

    def create_message(self, recipient: str, topic: str, payload: dict[str, Any]) -> Message:
        return Message(
            message_id=str(uuid.uuid4()),
            sender=self.name,
            recipient=recipient,
            topic=topic,
            payload=payload,
        )

    def spawn_subtask(self, objective_id: str, description: str, priority: int, depth: int) -> Task:
        return Task(
            task_id=str(uuid.uuid4()),
            objective_id=objective_id,
            description=description,
            priority=priority,
            depth=depth,
        )

    @abstractmethod
    def run(self, task: Task | None, inbox: list[Message]) -> AgentOutput:
        ...
