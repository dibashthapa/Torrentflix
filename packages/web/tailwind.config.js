module.exports = {
  purge: {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    enabled: process.env.NODE_ENV === "production",
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
