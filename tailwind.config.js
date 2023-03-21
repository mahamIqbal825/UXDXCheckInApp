/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './Src/screens/**/*.{js,jsx,ts,tsx}',
    './Src/**/*.{js,jsx,ts,tsx}',
    './screens/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      width: {
        wid: '100%',
      },
      colors: {
        secondary: '#557089',
        background: '#E5E5E5',
        offWhite: '#F4F4F4',
        errorText: '#6B7280',
        lightgrey: '#D3D3D3',
      },
      margin: {
        '5px': '5px',
      },
    },
  },
  plugins: ['nativewind/babel'],
};
