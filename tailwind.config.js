/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        default: ["var(--font-inter)"]
      },
      colors: {
        background: "var(--color-background)",
        foreground: "var(--color-foreground)"
      }
    }
  },
  plugins: []
};
