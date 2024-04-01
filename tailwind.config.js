/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",    //to include all .js,.jsx,.ts,.tsx  files present in src directory and its subdirectories/child folders so that css styles can be generated for every single file that containes Tailwind class names  
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

