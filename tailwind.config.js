/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        "main-bg":
          "url(https://script-tutorials.com/demos/360/images/stars.png)",
      },
      fontFamily: {
        jedi: ["Soloist"],
      },
    },
  },
  plugins: [],
};
