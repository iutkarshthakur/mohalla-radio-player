"use client";

import { useEffect, useState } from "react";

const BASE = 1842;

export default function ListenerCount() {
  const [count, setCount] = useState(BASE);

  useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => {
        const drift = Math.floor(Math.random() * 7) - 3;
        const next = c + drift;
        return next < BASE - 60 || next > BASE + 60 ? c - drift : next;
      });
    }, 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="glass flex items-center gap-2 rounded-2xl px-3.5 py-2"
      aria-label="Listeners tuned in right now"
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-blink rounded-full bg-sindoor" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-sindoor" />
      </span>
      <p className="tabular text-[13px] font-medium text-jasmine">
        {count.toLocaleString()}
        <span className="ml-1 font-normal text-white/60">tuned in</span>
      </p>
    </div>
  );
}
