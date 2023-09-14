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
      extend: {},
    },
    plugins: [],
  })