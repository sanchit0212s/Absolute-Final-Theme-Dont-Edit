import type { Config } from "tailwindcss";

export default {
  darkMode: false,
  content: ["./src/**/*.{ts,tsx}", "./index.html"],
  theme: {
    container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', "Georgia", "serif"],
        body:    ['"DM Sans"', "system-ui", "sans-serif"],
      },
      colors: {
        night:     "hsl(var(--night))",
        dusk:      "hsl(var(--dusk))",
        ember:     "hsl(var(--ember))",
        copper:    "hsl(var(--copper))",
        gold:      "hsl(var(--gold))",
        ivory:     "hsl(var(--ivory))",
        stone:     "hsl(var(--stone))",
        cinnabar:  "hsl(var(--cinnabar))",
        "night-mid": "hsl(var(--night-mid))",
      },
      borderRadius: { lg: "2px", md: "1px", sm: "0px" },
      transitionDuration: { "400": "400ms" },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
