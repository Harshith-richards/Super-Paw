from __future__ import annotations

from autonomous_agi.agents.base import BaseAgent
from autonomous_agi.core.schemas import AgentOutput, Message, Task


class AgentTemplate(BaseAgent):
    role = "Define responsibility"
    goals = ["goal-1", "goal-2"]
    decision_framework = ["observe", "plan", "act", "review"]
    input_schema = {"task": "Task | None", "inbox": "list[Message]"}
    output_schema = {"agent_output": "AgentOutput"}

    def run(self, task: Task | None, inbox: list[Message]) -> AgentOutput:
        self._log_event("run", {"task": task.description if task else None, "inbox_size": len(inbox)})
        return AgentOutput(agent_name=self.name, success=True, summary="Template completed")
