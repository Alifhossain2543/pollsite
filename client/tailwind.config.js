module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",

  theme: {
    fontFamily: {
      sans: ["sans-serif"],
    },
    colors: {
      primary: {
        light: "#e53935",
        DEFAULT: "#e53935",
        dark: "#ab000d",
      },
      secondary: {
        light: "##ff5252",
        DEFAULT: "#ff5252",
        dark: "#c50e29",
      },
      "card-color": {
        light: "#ef6c00",
        DEFAULT: "#ef6c00",
        dark: "#b53d00",
      },
      "card-two": {
        light: "#6effff",
        DEFAULT: "#6effff",
        dark: "#26cbcc",
      },
      "text-color": {
        light: "#363645",
        DEFAULT: "#363645",
        dark: "#fff",
      },
      bgOne: {
        light: "#E0E3EB",
        DEFAULT: "#E0E3EB",
        dark: "#E0E3EB",
      },
      "card-three": {
        light: "#77de88",
        DEFAULT: "#77de88",
        dark: "#77de88",
      },
      "card-four": {
        light: "#82b4f9",
        DEFAULT: "#82b4f9",
        dark: "#82b4f9",
      },
      "card-five": {
        light: "#ffc5a8",
        DEFAULT: "#ffc5a8",
        dark: "#ffc5a8",
      },
    },
    extend: {},
  },
  plugins: [],
}
