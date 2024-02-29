// const { default: daisyui } = require('daisyui');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: () => ({
        "custom-bg":
          "url('https://img.freepik.com/free-photo/flat-lay-orange-weights-with-water-bottle-copy-space_23-2148523264.jpg?w=826&t=st=1706809538~exp=1706810138~hmac=1a8dde04e95fdd59e552e2cb458a240ff9d32987d54539bbf05fe96b1d04d646')",
        "login-bg":
          "url('https://img.freepik.com/free-photo/high-angle-woman-running_23-2148435307.jpg?w=360&t=st=1706809839~exp=1706810439~hmac=25ff653940ec40e8c5c6e86a3fb7b833354a033b9b962773c264919e94f41a02')",
        "login-bg2":
          "url('https://img.freepik.com/free-photo/high-angle-palette-dumbbells_23-2149872131.jpg?w=360&t=st=1706833931~exp=1706834531~hmac=96510a882c7a504fa30dfc0748a8b341040f6798554e0f8ee25722f5cfd46ce5'), linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5))",
      }),

      colors: {
        'custom-color': '#f16e1e',  // Replace '#123456' with your custom color
      },
    },
    screens: {
      xs: "475px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1366px",
      "2xl": "1536px",
    },
    fontFamily: {
      popins: ["Poppins"],
    },
    },
    plugins: [],

}