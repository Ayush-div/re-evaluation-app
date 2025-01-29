/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.{js,ts,jsx,tsx}",  // Add this line to include public directory
  ],
  theme: {
    extend: {
      fontFamily: {
        'dm-sans': ['"DM Sans"', 'sans-serif'],
        'inconsolata': ['Inconsolata', 'monospace'],
        'poppins': ['Poppins', 'sans-serif'],
        'urbanist': ['Urbanist', 'system-ui', 'sans-serif'],
      },
      colors: {
        
      }
    },
  },
  plugins: [],
}
