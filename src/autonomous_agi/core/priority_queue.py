from __future__ import annotations

import heapq
from dataclasses import dataclass, field

from autonomous_agi.core.schemas import Task


@dataclass(order=True)
class PrioritizedTask:
    sort_index: tuple[int, int] = field(init=False)
    priority: int
    depth: int
    task: Task = field(compare=False)

    def __post_init__(self) -> None:
        self.sort_index = (self.priority, self.depth)


class TaskPriorityQueue:
    def __init__(self) -> None:
        self._heap: list[PrioritizedTask] = []

    def push(self, task: Task) -> None:
        heapq.heappush(self._heap, PrioritizedTask(task.priority, task.depth, task))

    def pop(self) -> Task | None:
        if not self._heap:
            return None
        return heapq.heappop(self._heap).task

    def __len__(self) -> int:
        return len(self._heap)
