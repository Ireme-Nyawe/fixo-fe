/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: '#295D42',
        secondary: "#1DCE5F",
        secondaryDark: "#1DCE8F",
        superior: "#329964",
        immediate:"#C2E0D1"
      },
    },
  },
  plugins: [],
};
