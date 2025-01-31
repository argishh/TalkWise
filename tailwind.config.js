/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/app/**/*.{js,ts,jsx,tsx}", // ✅ Includes all pages and layouts
      "./src/components/**/*.{js,ts,jsx,tsx}", // ✅ Includes components folder
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  };
  