/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        showBlur: "showBlur 1s forwards cubic-bezier(0.18, 0.89, 0.32, 1.28)",
        show2sec: "show 2s forwards",
      },
      keyframes: {
        showBlur: {
          "0%": { backdropFilter: "blur(0)" },
          "100%": { backdropFilter: "blur(10px)" },
        },
        show: {
          0: { opacity: 0 },
          100: { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
