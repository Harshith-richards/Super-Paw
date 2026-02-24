from __future__ import annotations

import json
import logging
from pathlib import Path
from typing import Any

logger = logging.getLogger(__name__)


class MemoryStore:
    def __init__(self, root: str = "./runtime/memory") -> None:
        self.root = Path(root)
        self.root.mkdir(parents=True, exist_ok=True)
        self.short_term_path = self.root / "short_term.json"
        self.long_term_path = self.root / "long_term.json"
        self.objectives_path = self.root / "objectives.json"
        self._bootstrap()

    def _bootstrap(self) -> None:
        for path in [self.short_term_path, self.long_term_path, self.objectives_path]:
            if not path.exists():
                path.write_text("{}", encoding="utf-8")

    def _load(self, path: Path) -> dict[str, Any]:
        return json.loads(path.read_text(encoding="utf-8"))

    def _save(self, path: Path, value: dict[str, Any]) -> None:
        path.write_text(json.dumps(value, indent=2), encoding="utf-8")

    def get(self, tier: str, key: str, default: Any = None) -> Any:
        path = self.short_term_path if tier == "short" else self.long_term_path
        data = self._load(path)
        return data.get(key, default)

    def set(self, tier: str, key: str, value: Any) -> None:
        path = self.short_term_path if tier == "short" else self.long_term_path
        data = self._load(path)
        data[key] = value
        self._save(path, data)

    def append_objective_snapshot(self, objective_id: str, snapshot: dict[str, Any]) -> None:
        data = self._load(self.objectives_path)
        data.setdefault(objective_id, []).append(snapshot)
        self._save(self.objectives_path, data)
        logger.info("Objective snapshot updated: %s", objective_id)
