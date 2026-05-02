module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./navigation/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0effe',
          100: '#e4e1fd',
          200: '#ccc6fb',
          300: '#a99bf8',
          400: '#8266f3',
          500: '#6C63FF',
          600: '#5a4be0',
          700: '#4c3dc4',
          800: '#3f33a0',
          900: '#362d80',
        },
        accent: {
          400: '#fb923c',
          500: '#f97316',
          600: '#ea6b10',
        },
        dark: {
          900: '#0f0f1a',
          800: '#1a1a2e',
          700: '#16213e',
          600: '#0f3460',
        }
      }
    },
  },
  plugins: [],
};
