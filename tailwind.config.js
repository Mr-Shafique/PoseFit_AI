
/** @type {import('tailwindcss').Config} */


module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      
    },
    screens: {
      xs: "475px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1366px",
    },
    fontFamily: {
      
      BebasNeue: ["Bebas Neue"],
      inter : ["Inter"],

    },
    },
    plugins: [require("daisyui")],
    daisyui: {
      themes: ["light", "dark", "cupcake"],
    },

}