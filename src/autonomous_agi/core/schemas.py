from __future__ import annotations

from datetime import datetime
from typing import Any, Literal

from pydantic import BaseModel, Field


class Objective(BaseModel):
    objective_id: str
    title: str
    priority: int = 5
    status: Literal["pending", "active", "blocked", "done"] = "pending"
    progress: float = 0.0
    metadata: dict[str, Any] = Field(default_factory=dict)


class Message(BaseModel):
    message_id: str
    sender: str
    recipient: str
    topic: str
    payload: dict[str, Any] = Field(default_factory=dict)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    correlation_id: str | None = None


class Task(BaseModel):
    task_id: str
    objective_id: str
    description: str
    priority: int = 5
    depth: int = 0
    status: Literal["queued", "running", "failed", "complete"] = "queued"
    constraints: dict[str, Any] = Field(default_factory=dict)


class AgentOutput(BaseModel):
    agent_name: str
    success: bool
    summary: str
    emitted_messages: list[Message] = Field(default_factory=list)
    generated_tasks: list[Task] = Field(default_factory=list)
    metrics: dict[str, float] = Field(default_factory=dict)
