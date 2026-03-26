import type { Config } from "tailwindcss";

export default {
  darkMode: false,
  content: ["./src/**/*.{ts,tsx}", "./index.html"],
  theme: {
    container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', "Georgia", "serif"],
        body:    ['"Outfit"', "system-ui", "sans-serif"],
      },
      colors: {
        saffron:  "hsl(var(--saffron))",
        marigold: "hsl(var(--marigold))",
        kumkum:   "hsl(var(--kumkum))",
        ivory:    "hsl(var(--ivory))",
        cream:    "hsl(var(--cream))",
        sand:     "hsl(var(--sand))",
        espresso: "hsl(var(--espresso))",
        mahogany: "hsl(var(--mahogany))",
        bark:     "hsl(var(--bark))",
        gold:     "hsl(var(--gold))",
      },
      fontSize: {
        "10xl": ["10rem", { lineHeight: "0.9" }],
        "9xl":  ["8rem",  { lineHeight: "0.92" }],
      },
      transitionDuration: { "400": "400ms" },
      clipPath: {
        "diagonal-down": "polygon(0 0, 100% 0, 100% 88%, 0 100%)",
        "diagonal-up":   "polygon(0 0, 100% 6%, 100% 100%, 0 100%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
