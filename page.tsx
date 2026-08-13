import Clock from "@/components/Clock";
import ListenerCount from "@/components/ListenerCount";
import SocialLinks from "@/components/SocialLinks";
import Player from "@/components/Player";

const inset = {
  top: "max(1rem, env(safe-area-inset-top))",
  right: "max(1rem, env(safe-area-inset-right))",
  left: "max(1rem, env(safe-area-inset-left))",
};

export default function Home() {
  return (
    <main className="relative flex min-h-dvh flex-1 flex-col items-center justify-between overflow-hidden">
      {/* 1. fixed backdrop art */}
      <div className="hero--bg fixed inset-0 -z-20" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/25 to-black/70" />
      </div>

      {/* 2. fixed grain overlay */}
      <div className="grain-overlay fixed inset-0 -z-10" aria-hidden="true" />

      {/* 3. fixed top row */}
      <div className="fixed z-10" style={{ top: inset.top, left: inset.left }}>
        <Clock />
      </div>
      <div
        className="fixed z-10 left-1/2 -translate-x-1/2"
        style={{ top: inset.top }}
      >
        <ListenerCount />
      </div>
      <div className="fixed z-10" style={{ top: inset.top, right: inset.right }}>
        <SocialLinks />
      </div>

      {/* signature: the hand-painted signboard wordmark */}
      <div className="mt-24 flex flex-col items-center text-center sm:mt-28">
        <h1 className="signboard text-4xl font-bold sm:text-5xl">
          मोहल्ला रेडियो
        </h1>
        <p className="mt-2 text-[13px] tracking-wide text-white/70">
          old gaane, apni gali se
        </p>
      </div>

      {/* 4. the player, bottom-anchored */}
      <div className="mt-auto flex w-full justify-center">
        <Player />
      </div>
    </main>
  );
}
