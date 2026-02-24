from __future__ import annotations

from abc import ABC, abstractmethod
from typing import Any


class ToolInterface(ABC):
    name: str

    @abstractmethod
    def execute(self, action: str, payload: dict[str, Any]) -> dict[str, Any]:
        ...


class APIAdapter(ToolInterface):
    name = "api_adapter"

    def execute(self, action: str, payload: dict[str, Any]) -> dict[str, Any]:
        return {"action": action, "status": "simulated", "payload": payload}


class FileSystemAdapter(ToolInterface):
    name = "filesystem_adapter"

    def execute(self, action: str, payload: dict[str, Any]) -> dict[str, Any]:
        return {"action": action, "status": "simulated", "path": payload.get("path")}
