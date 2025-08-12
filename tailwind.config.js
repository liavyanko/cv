/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html'],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter","system-ui","-apple-system","Segoe UI","Roboto","Helvetica Neue","Arial","Noto Sans","sans-serif"]
      },
      colors: {
        brand: {50:'#eef7ff',100:'#d9ecff',200:'#b4d9ff',300:'#86c1ff',400:'#56a3ff',500:'#2f86ff',600:'#1f6df5',700:'#1956cc',800:'#1749a6',900:'#183f87'}
      },
      boxShadow: { soft: '0 10px 30px rgba(0,0,0,0.08)' },
      keyframes: { floaty: { '0%,100%': { transform:'translateY(0)' }, '50%': { transform:'translateY(6px)' } } },
      animation: { floaty: 'floaty 2.5s ease-in-out infinite' }
    }
  }
};
