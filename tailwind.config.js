/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gov-blue': '#1e40af',
        'gov-dark': '#1e293b',
        'trust-green': '#10b981',
        'trust-red': '#ef4444',
      },
    },
  },
  plugins: [],
}
