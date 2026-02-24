from __future__ import annotations

from statistics import mean


class BenchmarkEngine:
    def score(self, metrics: list[float]) -> float:
        if not metrics:
            return 0.0
        return round(mean(metrics), 3)
