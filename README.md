# Mohalla Radio — मोहल्ला रेडियो

A single-page nostalgia radio site. Next.js 15 App Router, TypeScript, Tailwind CSS v4
(theme tokens only, no config file), no CSS-in-JS, no component library, no state manager.

## Run it

```bash
npm install
npm run dev
```

## Structure

```
app/
  layout.tsx      fonts (Baloo 2 for the signboard wordmark, Inter for UI), metadata, viewport-fit
  page.tsx         assembles the fixed backdrop, grain, top row, wordmark, and player
  globals.css      @theme tokens, the .hero--bg / .grain-overlay / .glass recipes, keyframes
components/
  Clock.tsx         live local time, top-left
  ListenerCount.tsx simulated live listener count, top-centre
  SocialLinks.tsx   Instagram / YouTube / WhatsApp icons, top-right (hrefs are "#" — swap in real links)
  Player.tsx        the two-block player: desktop glass pill + mobile stacked card
  VinylDisc.tsx     generative spinning disc (see "Cover art" below)
lib/
  tracks.ts         the 100-track playlist, transcribed from your two nostalgia lists
public/
  bg/scene-wide.png  landscape backdrop (from your uploaded street-scene artwork)
  bg/scene-tall.png  portrait backdrop, swapped in via `@media (orientation: portrait)`
```

## Audio

No audio files were provided, so the player is fully wired to a real `<audio>` element but
each track's `src` points to `/audio/<track-id>.mp3`, which doesn't exist yet. The transport,
seek bar, and elapsed/duration display all work against real audio state — drop matching MP3s
into `public/audio/` (see the `id` field on each track in `lib/tracks.ts` for exact filenames)
and playback will work end-to-end. Until then, play/pause will simply fail silently.

## Cover art

No per-track album art was supplied either, so `VinylDisc` paints a generative record label
(a deterministic hue per track, plus a grooved-vinyl texture) instead of fabricating fake
cover images. Swap in real artwork later by giving each `Track` a `coverUrl` and rendering an
`<img>`/`next/image` inside the disc in place of the gradient.

## Notes on the design

- Palette, type, and the "मोहल्ला रेडियो" signboard wordmark are drawn from your reference
  artwork's lamp-lit street and hand-painted shop signs — marigold-gold glow, night-navy base,
  a small sindoor-red accent reserved for the live "on air" dot only.
- The glass recipe, spinning-vinyl mechanics, and seek-bar behaviour follow your spec literally
  (gradient fill + blur + saturate + dual shadow; `animationPlayState` toggled from React state;
  invisible 24px hit area over a 3px rail with a hover-only knob).
