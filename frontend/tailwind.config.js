/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
      extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
          colors: {
              "neutral40": "#EEEAF4",
              "neutral30": "#BDBAC2",
              "neutral20": "#38363E",
              "neutral10": "#29282E",
              "neutral0": "#1C1B1F",
              "opacity0": "#3AF8CD08",
              "opacity1": "#3AF8CD0F",
              "primaryStatic": "#3AF8CD",
              "primaryHover": "#83FFE3",
              "primaryClick": "#B9FFEF",
              "primaryStatic": "#3AF8CD",
              "rarityCommon": "#EEEAF4",
              "rarityCommon2": "#3A393E",
              "rarityUncommon": "#6CFF95",
              "rarityUncommon2": "#303E38",
              "rarityRare": "#3EB9FF",
              "rarityRare2": "#2B3743",
              "rarityEpic": "#B66DFF",
              "rarityEpic2": "#372F43",
              "rarityLegendary": "#FF9900",
              "rarityLegendary2": "#3E3329",
          }
    },
  },
  plugins: [],
};

