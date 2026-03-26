import type { Config } from "tailwindcss";

export default {
  darkMode: false,
  content: ["./src/**/*.{ts,tsx}", "./index.html"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', "Georgia", "serif"],
        body: ["Inter", "system-ui", "sans-serif"],
        serif: ["Lora", "Georgia", "serif"],
      },
      colors: {
        parchment: "hsl(var(--parchment))",
        "antique-ivory": "hsl(var(--antique-ivory))",
        "warm-tan": "hsl(var(--warm-tan))",
        "temple-gold": "hsl(var(--temple-gold))",
        "bright-gold": "hsl(var(--bright-gold))",
        "shimmer-gold": "hsl(var(--shimmer-gold))",
        saffron: "hsl(var(--saffron))",
        espresso: "hsl(var(--espresso))",
        mahogany: "hsl(var(--mahogany))",
        walnut: "hsl(var(--walnut))",
        "footer-bg": "hsl(var(--footer-bg))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
