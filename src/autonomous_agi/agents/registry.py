from __future__ import annotations

from autonomous_agi.agents.specialized import (
    CodeAgent,
    CommunicationAgent,
    DeviceMonitorAgent,
    MemoryAgent,
    OrchestratorAgent,
    SchedulerAgent,
    SecurityAgent,
    SelfReflectionAgent,
    ToolAgent,
    WebAgent,
)


def build_agents() -> dict[str, object]:
    agents = {
        "orchestrator": OrchestratorAgent("orchestrator"),
        "memory": MemoryAgent("memory"),
        "web": WebAgent("web"),
        "communication": CommunicationAgent("communication"),
        "scheduler": SchedulerAgent("scheduler"),
        "device_monitor": DeviceMonitorAgent("device_monitor"),
        "code": CodeAgent("code"),
        "self_reflection": SelfReflectionAgent("self_reflection"),
        "security": SecurityAgent("security"),
        "tool": ToolAgent("tool"),
    }
    return agents
