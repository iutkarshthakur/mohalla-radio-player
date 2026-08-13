import type { Track } from "@/lib/tracks";

export default function VinylDisc({
  track,
  size,
  spinning,
}: {
  track: Track;
  size: number;
  spinning: boolean;
}) {
  const hole = Math.max(10, Math.round(size * 0.14));
  return (
    <div
      className="relative shrink-0 rounded-full"
      style={{
        width: size,
        height: size,
        animation: "spin 8s linear infinite",
        animationPlayState: spinning ? "running" : "paused",
        backgroundImage: [
          "repeating-radial-gradient(circle at 50% 50%, rgba(0,0,0,0.25) 0px, rgba(0,0,0,0.25) 1px, transparent 2px, transparent 4px)",
          `radial-gradient(circle at 35% 32%, hsl(${track.hue} 70% 55%), hsl(${track.hue} 65% 18%) 70%)`,
        ].join(", "),
        boxShadow:
          "0 6px 18px -4px rgba(0,0,0,0.7), inset 0 0 0 1px rgba(255,255,255,0.15)",
      }}
      aria-hidden="true"
    >
      <div
        className="absolute rounded-full bg-black/70 ring-2 ring-white/40"
        style={{
          width: hole,
          height: hole,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  );
}
