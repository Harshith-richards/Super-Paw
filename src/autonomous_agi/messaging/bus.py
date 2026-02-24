from __future__ import annotations

import logging
from collections import defaultdict, deque
from typing import Callable

from autonomous_agi.core.schemas import Message

logger = logging.getLogger(__name__)


class MessageBus:
    def __init__(self) -> None:
        self._mailboxes: dict[str, deque[Message]] = defaultdict(deque)
        self._subscribers: dict[str, list[Callable[[Message], None]]] = defaultdict(list)

    def publish(self, message: Message) -> None:
        logger.debug("Publishing message: %s", message)
        self._mailboxes[message.recipient].append(message)
        for callback in self._subscribers.get(message.recipient, []):
            callback(message)

    def fetch(self, recipient: str) -> list[Message]:
        mailbox = self._mailboxes[recipient]
        items = list(mailbox)
        mailbox.clear()
        return items

    def subscribe(self, recipient: str, callback: Callable[[Message], None]) -> None:
        self._subscribers[recipient].append(callback)
