"use client";

import { useEffect, useState } from "react";

export default function Clock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const time = now
    ? now.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      })
    : "--:--:--";

  const date = now
    ? now.toLocaleDateString(undefined, {
        weekday: "short",
        day: "numeric",
        month: "short",
      })
    : "";

  return (
    <div
      className="glass rounded-2xl px-3.5 py-2 leading-none"
      aria-label="Current time"
    >
      <p className="tabular text-[15px] font-semibold text-jasmine">{time}</p>
      <p className="mt-0.5 text-[10.5px] uppercase tracking-wide text-white/60">
        {date}
      </p>
    </div>
  );
}
