const LINKS = [
  {
    label: "Instagram",
    href: "#",
    path: "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5A5.5 5.5 0 1 1 6.5 13 5.5 5.5 0 0 1 12 7.5Zm0 2A3.5 3.5 0 1 0 15.5 13 3.5 3.5 0 0 0 12 9.5ZM17.8 6a1 1 0 1 1-1 1 1 1 0 0 1 1-1Z",
  },
  {
    label: "YouTube",
    href: "#",
    path: "M21.6 7.2s-.2-1.5-.9-2.2c-.8-.9-1.7-.9-2.2-1C15.1 3.7 12 3.7 12 3.7h0s-3.1 0-6.5.3c-.5.1-1.4.1-2.2 1-.7.7-.9 2.2-.9 2.2S2.1 9 2.1 10.7v1.5c0 1.8.2 3.5.2 3.5s.2 1.5.9 2.2c.8.9 1.9.9 2.4 1 1.7.2 7.3.3 7.3.3s3.1 0 6.5-.3c.5-.1 1.4-.1 2.2-1 .7-.7.9-2.2.9-2.2s.2-1.8.2-3.5v-1.5c0-1.8-.2-3.5-.2-3.5ZM9.9 14.6V8.9l5.4 2.9-5.4 2.8Z",
  },
  {
    label: "WhatsApp",
    href: "#",
    path: "M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm0 2a8 8 0 0 1 6.9 12l-.2.4.6 2.3-2.3-.6-.4.2A8 8 0 1 1 12 4Zm-3 3.6c-.2 0-.5 0-.7.3-.2.3-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.8 2.9 4.5 4 2.2 1 2.7.8 3.1.8.5-.1 1.6-.6 1.8-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.6-.4l-1.7-.8c-.2-.1-.4-.1-.6.1l-.7.9c-.1.2-.3.2-.5.1-.3-.1-1.2-.4-2.2-1.4-.8-.7-1.4-1.6-1.5-1.9-.2-.3 0-.4.1-.6l.4-.5c.1-.2.2-.3.2-.5s0-.4-.1-.5c0-.2-.6-1.6-.9-2.1-.2-.5-.4-.4-.6-.4H9Z",
  },
];

export default function SocialLinks() {
  return (
    <nav
      className="glass flex items-center gap-1 rounded-2xl p-1.5"
      aria-label="Follow Mohalla Radio"
    >
      {LINKS.map((link) => (
        <a
          key={link.label}
          href={link.href}
          aria-label={link.label}
          className="flex h-8 w-8 items-center justify-center rounded-xl text-white/70 transition hover:bg-white/10 hover:text-marigold"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
            <path d={link.path} />
          </svg>
        </a>
      ))}
    </nav>
  );
}
