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
      backgroundImage : {
        "heroImage": "url('/images/BannarCover/banner.jpg')",
      },
      borderColor: {
        "borderInputColor" : "#E5E7EB",
        "borderFocusColor" : "#3B82F6",




        "borderColor": "#dfe6e9",
        "contentBorder": "#BDBDBD",
        "outlineBorderColor" : "#FCD34D",
        "outlineHoverBorderColor" : "#FBBF24"
      },
      backgroundColor: {

        "buttonBgColor" : "#2563EB",
        "buttonHoverBgColor" : "#1D4ED8",
        "headerBgColor" : "#1D4ED8",
        "callButtonColor" : "#16A34A",
        "bookServiceColor" : "#F97316",




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
        "textBannerColor" : "#2563EB",
        




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
