/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-dark-purple": "#1F1D2B", // Your custom color
        "custom-font-color-orange": "#EB966A",
        "input-text-color": "#A1A7C4",
        "logo-outer-color": "#EB966A",
        "gradient-custom": "linear-gradient(to top, #EA9769, #EA6969)",
        "dash-back-color": "#252836",
        "icon-color": "#EA7C69",
        "highlight-icon": "0px 4px 6px rgba(234, 124, 105, 0.32)",
        "highlight-bg-icon": "#EA7C69",
        
      },
      boxShadow: {
        custom: "0 4px 50px rgba(235, 150, 106, 0.8)", // Custom shadow with your color
      },
    },
  },
  plugins: [],
};
