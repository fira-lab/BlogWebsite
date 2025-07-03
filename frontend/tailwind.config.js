/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#291f4e",
        secondary: "#f97316",
        tertiary: "#835aec",
        fourth: "#835aec",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },

      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        slideIn: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        pulse: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.5 },
        },
        typing: {
          "0%": { width: "0ch" },
          "100%": { width: "var(--typing-width)" },
        },
        "blink-caret": {
          "0%, 100%": { borderColor: "transparent" },
          "50%": { borderColor: "currentColor" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
      animation: {
        "fade-in": "fadeIn 1s ease-in-out",
        "slide-in": "slideIn 1s ease-in-out",
        pulse: "pulse 2s infinite",
        "custom-typing":
          "typing 2s steps(30, end), blink-caret .75s step-end infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
    screens: {
      lg: { max: "2023px" },
      sm: { max: "639px" },
      md: { min: "700px", max: "1500px" },
      ip: { min: "900px", max: "1300px" },
      ipr: { min: "430px", max: "499px" },
      smm: { min: "300px", max: "389px" },
      ip4: { min: "840px", max: "960px" },
      df: { min: "390px", max: "429px" },
      sd: { min: "500px", max: "540px" },
    },
    fontFamily: {
      sans: ["Roboto", "sans-serif"],
    },
  },
  plugins: [],
};
