/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // screens: {
      //   'md': "1034px"
      // },
      borderColor: {
        "borderInputColor" : "#D1D5DB",
        "borderFocusColor" : "#3B82F6",




        "borderColor": "#dfe6e9",
        "contentBorder": "#BDBDBD",
        "outlineBorderColor" : "#FCD34D",
        "outlineHoverBorderColor" : "#FBBF24"
      },
      backgroundColor: {

        "buttonBgColor" : "#2563EB",
        "buttonHoverBgColor" : "#1D4ED8",




        "bgColor": "#2563EB",
        "bgSecondaryColor": "#576574",
        "hoverBg": "#1D4ED8",
        "footercolor": "#dfe6e9",
        "heroBgcolor": "#28548A",
        "inputBackgroundcolor": "#EEEEEE",
        "contentHover": "#F1F1F1",
        "applyButtonColor" : "#0a66c2",
      },
      textColor: {
        "textColor": "#4B5563",
        "textHeadingColor" : "#111827",
        "textIconColor" : "#9CA3AF",
        




        "paraColor": "#4B5563",
        "textSecondaryColor": "#e58e26",
        "textprimaryColor": "#767676",
        "bottom-textColor": "#022279",
        "textHeadingColor": "#171717",
        "black90" : "#000000E6"
      },
      fontSize: {
        "textmedium": "15px"
      }
    },
  },
  plugins: [],
};
