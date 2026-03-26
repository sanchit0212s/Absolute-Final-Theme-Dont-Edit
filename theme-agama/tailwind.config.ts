import type { Config } from "tailwindcss";

export default {
  darkMode: false,
  content: ["./src/**/*.{ts,tsx}", "./index.html"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', "system-ui", "sans-serif"],
        body:    ['"Inter"', "system-ui", "sans-serif"],
      },
      colors: {
        white:    "#FFFFFF",
        gallery:  "#F7F7F5",
        brass:    "#B8860B",
        "brass-light": "#D4A017",
        graphite: "#8A8A82",
        charcoal: "#333330",
        ink:      "#111110",
      },
      fontSize: {
        "massive": ["clamp(5rem, 12vw, 12rem)", { lineHeight: "0.88", letterSpacing: "-0.03em" }],
        "big":     ["clamp(2.8rem, 6vw, 5.5rem)", { lineHeight: "0.95", letterSpacing: "-0.02em" }],
        "metric":  ["clamp(4rem, 8vw, 8rem)", { lineHeight: "0.85", letterSpacing: "-0.04em" }],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
