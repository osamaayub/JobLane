/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Adjust paths as necessary for your project
    './public/index.html',
  ],

  darkMode: 'class', // Use 'class' to manually control dark mode

  theme: {
    extend: {
      colors: {
        primary: colors.indigo[600],
        secondary: colors.blue[600],
        accent: colors.yellow[400],
        danger: colors.red[600],
        success: colors.green[500],
        muted: colors.gray[200],
        // Additional custom colors
        customGray: '#A0AEC0',
        customBlue: '#3182CE',
        // Define dark mode colors
        dark: {
          primary: colors.indigo[900],
          secondary: colors.blue[800],
          background: colors.gray[900],
          text: colors.gray[100],
        },
      },
    },
  },

  plugins: [],
};
