import type { Config } from "tailwindcss";

export default {
  darkMode: false,
  content: ["./src/**/*.{ts,tsx}", "./index.html"],
  theme: {
    container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', "Georgia", "serif"],
        body:    ['"Karla"', "system-ui", "sans-serif"],
      },
      colors: {
        paper:     "hsl(var(--paper))",
        ink:       "hsl(var(--ink))",
        graphite:  "hsl(var(--graphite))",
        clay:      "hsl(var(--clay))",
        "clay-light": "hsl(var(--clay-light))",
        ash:       "hsl(var(--ash))",
        linen:     "hsl(var(--linen))",
        smoke:     "hsl(var(--smoke))",
        warm:      "hsl(var(--warm))",
      },
      fontSize: {
        "hero":  ["clamp(4rem, 10vw, 9rem)", { lineHeight: "0.92", letterSpacing: "-0.02em" }],
        "title": ["clamp(2.5rem, 5vw, 4.5rem)", { lineHeight: "1.05" }],
        "pull":  ["clamp(1.6rem, 3vw, 2.6rem)", { lineHeight: "1.3" }],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
