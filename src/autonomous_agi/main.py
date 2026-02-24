from __future__ import annotations

import argparse

import yaml

from autonomous_agi.core.engine import AutonomousEngine, EngineConfig
from autonomous_agi.utils.logging import configure_logging


def load_config(path: str) -> EngineConfig:
    raw = yaml.safe_load(open(path, encoding="utf-8"))
    logging_cfg = raw.get("logging", {})
    configure_logging(logging_cfg.get("level", "INFO"), logging_cfg.get("dir", "./runtime/logs"))
    engine_cfg = raw.get("engine", {})
    return EngineConfig(
        continuous_mode=engine_cfg.get("continuous_mode", True),
        max_cycles=engine_cfg.get("max_cycles", 50),
        loop_sleep_seconds=engine_cfg.get("loop_sleep_seconds", 0.2),
    )


def run() -> None:
    parser = argparse.ArgumentParser(description="Autonomous Personal AGI")
    parser.add_argument("--config", default="config/system.yaml")
    args = parser.parse_args()
    config = load_config(args.config)
    engine = AutonomousEngine(config)
    engine.add_objective("Manage daily workflow, communications, and coding tasks", priority=3)
    engine.run()


if __name__ == "__main__":
    run()
