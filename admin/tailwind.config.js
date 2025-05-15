/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor : {
        "sidebarBg" : "#fff",
        "bgHover" : "#eaeaea",
        "activeColor" : "#1D4ED8",
        "headerBgColor" : "#FAFAFA",
        "categoryBg" : "#1572E8",
        "jobsBg" : "#48ABF7",
        "usersBg" : "#31CE36",
        "successBg" : "#28a745"
      },
      colors : {
        "headingColor" : "#171717",
        "textColor" : "#8d9498",
      }
    },
  },
  plugins: [],
};
