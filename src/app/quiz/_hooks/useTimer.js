"use client";

import { useState, useEffect, useRef, useCallback } from "react";

/**
 * Optional countdown timer per question.
 * @param {number} seconds - time limit per question
 * @param {Function} onExpire - called when time runs out
 */
export function useTimer(seconds, onExpire) {
  const [timeLeft, setTimeLeft]   = useState(seconds);
  const onExpireRef               = useRef(onExpire);
  onExpireRef.current             = onExpire;

  const reset = useCallback(() => {
    setTimeLeft(seconds);
  }, [seconds]);

  useEffect(() => {
    if (!seconds) return;

    setTimeLeft(seconds);
    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(interval);
          onExpireRef.current?.();
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  return { timeLeft, reset };
}
