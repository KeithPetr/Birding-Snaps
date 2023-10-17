/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
      './pages/**/*.{html,js}',
      './components/**/*.{html,js,jsx}',
      
    ],
    theme: {
      extend: {
        backgroundImage: {
          'mountains': "url('./src/photos/mountains.jpg')",
        },
        backgroundColor: {
          'black-opacity-30': 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
    plugins: [],
  })