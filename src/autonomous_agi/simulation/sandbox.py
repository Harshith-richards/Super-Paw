from __future__ import annotations

from dataclasses import dataclass


@dataclass
class SimulationResult:
    scenario: str
    score: float
    notes: str


class SimulationSandbox:
    def run(self, scenario: str) -> SimulationResult:
        return SimulationResult(scenario=scenario, score=0.82, notes="Scenario executed in safe simulation mode")
