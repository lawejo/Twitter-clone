/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    '../views/*.html',
    "./node_modules/flowbite/**/*.js"],
  theme: {
    screens: {
      sm: "420px",

      md: "500px",

      md_lg: "687px",

      lg: "988px",

      xl: "1265px",

      xxl: "1401px",
    },
    colors: {
      'twitterblue': "#1D9BF0",
      'buttonwhite': '#E6E6E6',
      'bordergray': '#2F3336',
      'searchfield': '#202327',
      'iconwhite': '#E7E9EA',
      'fadedheadline': '#686D72',
      'fadedhover': '#1D1F23'
    },
    fontSize: {
      '13': '13px',
      '15': '15px',
      'twenty': '20px',
      '31': '31px',
    },
    height: {
      'full': '100%',
      'screen': '100vh',
      '20': '20px',
      '6': '24px',
      '26': '26px',
      '40': '40px',
      '14': '56px',
      '16': '64px',
    },
    width: {
      'full': '100%',
      '20': '20px',
      '6': '24px',
      '26': '26px',
      '14': '56px',
      '16': '64px',
      '330': '330px',
      '600': '600px',

    },
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
};
