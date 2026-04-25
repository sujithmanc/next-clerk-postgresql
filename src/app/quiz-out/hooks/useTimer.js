import { useEffect, useState } from "react";

export default function useTimer(seconds, onEnd) {
  const [time, setTime] = useState(seconds);

  useEffect(() => {
    if (time <= 0) {
      onEnd && onEnd();
      return;
    }
    const id = setInterval(() => setTime((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [time]);

  return time;
}
