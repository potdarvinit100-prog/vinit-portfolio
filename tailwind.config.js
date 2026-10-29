/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0a0a10',
        panel: '#12121a',
        viol: '#8b5cf6',
        lime: '#c6ff3d',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['"Space Grotesk"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
