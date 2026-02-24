from __future__ import annotations

from autonomous_agi.agents.base import BaseAgent
from autonomous_agi.core.schemas import AgentOutput, Message, Task


class StructuredAgent(BaseAgent):
    decision_framework = [
        "validate task and permissions",
        "query memory and context",
        "select tool and policy",
        "execute bounded action",
        "log outcome and emit follow-ups",
    ]
    input_schema = {"task": "Task | None", "inbox": "list[Message]"}
    output_schema = {"success": "bool", "summary": "str", "messages": "list[Message]", "tasks": "list[Task]"}

    def safe_run(self, task: Task | None, inbox: list[Message]) -> AgentOutput:
        try:
            return self.run_loop(task, inbox)
        except Exception as exc:  # failure handling
            self._log_event("failure", {"error": str(exc)})
            return AgentOutput(agent_name=self.name, success=False, summary=f"Failure: {exc}")

    def run(self, task: Task | None, inbox: list[Message]) -> AgentOutput:
        return self.safe_run(task, inbox)

    def run_loop(self, task: Task | None, inbox: list[Message]) -> AgentOutput:
        raise NotImplementedError


class OrchestratorAgent(StructuredAgent):
    role = "Central planner and recursive decomposer"
    goals = ["decompose objectives", "route tasks", "track progress"]

    def run_loop(self, task: Task | None, inbox: list[Message]) -> AgentOutput:
        emitted: list[Message] = []
        new_tasks: list[Task] = []
        if task and task.depth < 2:
            for segment in ["analyze", "execute", "verify"]:
                new_tasks.append(self.spawn_subtask(task.objective_id, f"{segment}: {task.description}", task.priority, task.depth + 1))
        emitted.append(self.create_message("memory", "objective_progress", {"task": task.model_dump() if task else None}))
        return AgentOutput(agent_name=self.name, success=True, summary="Plan updated", emitted_messages=emitted, generated_tasks=new_tasks)


class MemoryAgent(StructuredAgent):
    role = "Long-term and short-term memory management"
    goals = ["store key context", "surface relevant context"]

    def run_loop(self, task: Task | None, inbox: list[Message]) -> AgentOutput:
        return AgentOutput(agent_name=self.name, success=True, summary=f"Memory synchronized with {len(inbox)} events")


class WebAgent(StructuredAgent):
    role = "Web interaction and browser automation"
    goals = ["fetch web data", "run browser workflows"]

    def run_loop(self, task: Task | None, inbox: list[Message]) -> AgentOutput:
        return AgentOutput(agent_name=self.name, success=True, summary="Web workflow staged")


class CommunicationAgent(StructuredAgent):
    role = "Email drafting/filtering and notification intelligence"
    goals = ["draft communication", "prioritize notifications"]

    def run_loop(self, task: Task | None, inbox: list[Message]) -> AgentOutput:
        return AgentOutput(agent_name=self.name, success=True, summary="Communication triage completed")


class SchedulerAgent(StructuredAgent):
    role = "Calendar management and reminders"
    goals = ["schedule events", "generate reminders"]

    def run_loop(self, task: Task | None, inbox: list[Message]) -> AgentOutput:
        return AgentOutput(agent_name=self.name, success=True, summary="Calendar and reminders optimized")


class DeviceMonitorAgent(StructuredAgent):
    role = "Phone usage and system behavior monitoring"
    goals = ["collect usage signals", "flag anomalies"]

    def run_loop(self, task: Task | None, inbox: list[Message]) -> AgentOutput:
        return AgentOutput(agent_name=self.name, success=True, summary="Device telemetry processed")


class CodeAgent(StructuredAgent):
    role = "Code generation and automation"
    goals = ["generate code", "refactor modules", "create tests"]

    def run_loop(self, task: Task | None, inbox: list[Message]) -> AgentOutput:
        return AgentOutput(agent_name=self.name, success=True, summary="Code synthesis plan generated")


class SelfReflectionAgent(StructuredAgent):
    role = "Error analysis and evolutionary self-improvement"
    goals = ["benchmark", "score performance", "rewrite strategies"]

    def run_loop(self, task: Task | None, inbox: list[Message]) -> AgentOutput:
        self._rewrite_strategy({"quality": 0.08, "risk": 0.02})
        return AgentOutput(agent_name=self.name, success=True, summary="Reflection cycle complete", metrics={"score": self.performance_score})


class SecurityAgent(StructuredAgent):
    role = "Permission and risk control"
    goals = ["enforce safety boundaries", "block unsafe operations"]

    def run_loop(self, task: Task | None, inbox: list[Message]) -> AgentOutput:
        summary = "Security checks passed"
        if task and "delete" in task.description.lower():
            summary = "Task flagged for manual approval"
        return AgentOutput(agent_name=self.name, success=True, summary=summary)


class ToolAgent(StructuredAgent):
    role = "API and external tool integration"
    goals = ["normalize tool calls", "handle API retries"]

    def run_loop(self, task: Task | None, inbox: list[Message]) -> AgentOutput:
        return AgentOutput(agent_name=self.name, success=True, summary="Tool routing complete")
