import { useEffect } from 'react';

/**
 * Reference-counted body scroll lock.
 *
 * Multiple components (loader, mobile menu, modals) may want to lock scrolling
 * at overlapping times. A shared counter ensures the body is only unlocked once
 * every active lock has been released — no component clobbers another's cleanup.
 */
let lockCount = 0;
let previousOverflow = '';

function acquire() {
  if (lockCount === 0) {
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }
  lockCount += 1;
}

function release() {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    document.body.style.overflow = previousOverflow;
  }
}

/** Locks body scroll while `active` is true. Safe to nest/overlap. */
export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    acquire();
    return release;
  }, [active]);
}
