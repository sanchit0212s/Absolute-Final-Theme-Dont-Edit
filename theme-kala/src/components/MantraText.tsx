import { useRef, useCallback } from "react";

const COLORS = [
  "hsl(44, 92%, 62%)",  // shimmer-gold
  "hsl(42, 88%, 52%)",  // bright-gold
  "hsl(40, 90%, 42%)",  // temple-gold
  "hsl(45, 95%, 72%)",  // light sparkle
];

export default function MantraText({ text }: { text: string }) {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const lastSpawn = useRef(0);

  const spawnSparkle = useCallback((e: React.MouseEvent) => {
    const now = Date.now();
    if (now - lastSpawn.current < 50) return; // throttle to ~20/sec
    lastSpawn.current = now;

    const wrap = wrapRef.current;
    if (!wrap) return;

    const rect = wrap.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Spawn 2-3 particles per move event for density
    const count = 2 + Math.floor(Math.random() * 2);
    for (let i = 0; i < count; i++) {
      const el = document.createElement("span");

      const isStar = Math.random() > 0.6;
      el.className = isStar ? "sparkle-star" : "sparkle-particle";

      const size = isStar
        ? 4 + Math.random() * 6    // stars: 4-10px
        : 2 + Math.random() * 4;   // dots: 2-6px

      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const dur = 0.5 + Math.random() * 0.5;

      // Scatter slightly around cursor
      const ox = (Math.random() - 0.5) * 16;
      const oy = (Math.random() - 0.5) * 12;

      el.style.cssText = `
        left: ${x + ox}px;
        top: ${y + oy}px;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        --dur: ${dur}s;
      `;

      wrap.appendChild(el);
      setTimeout(() => el.remove(), dur * 1000);
    }
  }, []);

  return (
    <span
      ref={wrapRef}
      className="mantra-wrap"
      onMouseMove={spawnSparkle}
    >
      <span className="mantra-text text-xs">{text}</span>
    </span>
  );
}
