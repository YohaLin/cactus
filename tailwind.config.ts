import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "360px",
      md: "768px",
      lg: "1024px",
      xl: "1200px",
    },
    extend: {
      colors: {
        blue: "#3178CC",
        green: "#8BCA5E",
        pink: "#D84A9E",
      },
      fontSize: {
        "heading-1": ["84px", { lineHeight: "1.2", fontWeight: "500" }],
        "heading-2": ["56px", { lineHeight: "1.3", fontWeight: "500" }],
        "heading-3": ["32px", { lineHeight: "1.4", fontWeight: "700" }],
      },
    },
  },
  plugins: [],
} satisfies Config;
