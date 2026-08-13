"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { TRACKS, formatTime } from "@/lib/tracks";
import VinylDisc from "@/components/VinylDisc";

function PrevIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
      <path d="M6 5a1 1 0 0 1 1 1v5.2l9.5-6a1 1 0 0 1 1.5.85v12a1 1 0 0 1-1.5.85L7 12.8V18a1 1 0 1 1-2 0V6a1 1 0 0 1 1-1Z" />
    </svg>
  );
}

function NextIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
      <path d="M18 5a1 1 0 0 0-1 1v5.2l-9.5-6A1 1 0 0 0 6 6.05v12a1 1 0 0 0 1.5.85L17 12.8V18a1 1 0 1 0 2 0V6a1 1 0 0 0-1-1Z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
      <path d="M8 5.6a1 1 0 0 1 1.53-.85l10 6.4a1 1 0 0 1 0 1.7l-10 6.4A1 1 0 0 1 8 18.4Z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
      <path d="M7 5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1Zm7 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1Z" />
    </svg>
  );
}

export default function Player() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(TRACKS[0].duration);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const track = TRACKS[index];

  useEffect(() => {
    setDuration(track.duration);
    setCurrentTime(0);
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.play().catch(() => setPlaying(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.play().catch(() => setPlaying(false));
    } else {
      audio.pause();
    }
  }, [playing]);

  function togglePlay() {
    setPlaying((p) => !p);
  }

  function goPrev() {
    setIndex((i) => (i - 1 + TRACKS.length) % TRACKS.length);
  }

  function goNext() {
    setIndex((i) => (i + 1) % TRACKS.length);
  }

  function onSeek(value: number) {
    const audio = audioRef.current;
    setCurrentTime(value);
    if (audio && Number.isFinite(audio.duration)) {
      audio.currentTime = value;
    }
  }

  const progressPct = useMemo(
    () => (duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0),
    [currentTime, duration]
  );

  return (
    <div className="w-full max-w-xl px-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
      <audio
        ref={audioRef}
        src={`/audio/${track.id}.mp3`}
        preload="metadata"
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => {
          if (Number.isFinite(e.currentTarget.duration)) {
            setDuration(e.currentTarget.duration);
          }
        }}
        onEnded={goNext}
      />

      {/* DESKTOP — horizontal glass pill */}
      <div className="glass hidden w-full items-center gap-4 rounded-full p-3 pr-5 sm:flex">
        <VinylDisc track={track} size={88} spinning={playing} />

        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] font-semibold text-jasmine">
            {track.title}
          </p>
          <p className="truncate text-[12.5px] text-white/70">
            {track.era} Bollywood
          </p>

          <SeekBar
            currentTime={currentTime}
            duration={duration}
            progressPct={progressPct}
            onSeek={onSeek}
          />

          <div className="mt-1 flex justify-between text-[10.5px] text-white/60">
            <span className="tabular">{formatTime(currentTime)}</span>
            <span className="tabular">{formatTime(duration)}</span>
          </div>
        </div>

        <Transport
          playing={playing}
          onPrev={goPrev}
          onNext={goNext}
          onToggle={togglePlay}
        />
      </div>

      {/* MOBILE — stacked card */}
      <div className="glass flex w-full flex-col gap-3 rounded-3xl p-4 sm:hidden">
        <div className="flex items-center gap-3">
          <VinylDisc track={track} size={56} spinning={playing} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[15px] font-semibold text-jasmine">
              {track.title}
            </p>
            <p className="truncate text-[12.5px] text-white/70">
              {track.era} Bollywood
            </p>
          </div>
          <Transport
            playing={playing}
            onPrev={goPrev}
            onNext={goNext}
            onToggle={togglePlay}
            compact
          />
        </div>

        <div>
          <SeekBar
            currentTime={currentTime}
            duration={duration}
            progressPct={progressPct}
            onSeek={onSeek}
          />
          <div className="mt-1 flex justify-between text-[10.5px] text-white/60">
            <span className="tabular">{formatTime(currentTime)}</span>
            <span className="tabular">{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SeekBar({
  currentTime,
  duration,
  progressPct,
  onSeek,
}: {
  currentTime: number;
  duration: number;
  progressPct: number;
  onSeek: (value: number) => void;
}) {
  return (
    <div className="group relative flex h-6 w-full items-center">
      <div className="relative h-[3px] w-full overflow-hidden rounded-full bg-white/15">
        <div
          className="seek-fill h-full rounded-full"
          style={{ width: `${progressPct}%` }}
        />
      </div>
      <div
        className="pointer-events-none absolute h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-jasmine opacity-0 shadow-[0_0_8px_rgba(232,166,59,0.8)] transition-opacity duration-150 group-hover:opacity-100"
        style={{ left: `${progressPct}%` }}
      />
      <input
        type="range"
        min={0}
        max={Math.max(duration, 1)}
        step={1}
        value={Math.min(currentTime, duration)}
        onChange={(e) => onSeek(Number(e.target.value))}
        aria-label={`Seek — ${formatTime(currentTime)} of ${formatTime(duration)}`}
        className="absolute inset-0 h-6 w-full cursor-pointer appearance-none bg-transparent opacity-0"
      />
    </div>
  );
}

function Transport({
  playing,
  onPrev,
  onNext,
  onToggle,
  compact = false,
}: {
  playing: boolean;
  onPrev: () => void;
  onNext: () => void;
  onToggle: () => void;
  compact?: boolean;
}) {
  const btn =
    "flex items-center justify-center rounded-full text-jasmine/90 transition hover:text-marigold";
  return (
    <div className={`flex shrink-0 items-center ${compact ? "gap-1" : "gap-2"}`}>
      <button
        type="button"
        onClick={onPrev}
        aria-label="Previous track"
        className={`${btn} h-8 w-8`}
      >
        <PrevIcon />
      </button>
      <button
        type="button"
        onClick={onToggle}
        aria-label={playing ? "Pause" : "Play"}
        className="flex h-11 w-11 items-center justify-center rounded-full bg-marigold text-ink shadow-[0_4px_16px_rgba(232,166,59,0.55)] transition hover:brightness-110 active:scale-95"
      >
        {playing ? <PauseIcon /> : <PlayIcon />}
      </button>
      <button
        type="button"
        onClick={onNext}
        aria-label="Next track"
        className={`${btn} h-8 w-8`}
      >
        <NextIcon />
      </button>
    </div>
  );
}
