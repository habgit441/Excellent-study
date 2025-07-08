// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        'line-move': {
          '0%': { top: '0%', left: '10%', transform: 'rotate(0deg)' },
          '25%': { top: '30%', left: '70%', transform: 'rotate(45deg)' },
          '50%': { top: '70%', left: '20%', transform: 'rotate(90deg)' },
          '75%': { top: '50%', left: '80%', transform: 'rotate(135deg)' },
          '100%': { top: '0%', left: '10%', transform: 'rotate(0deg)' },
        },
      },
      animation: {k 
        'line-move': 'line-move 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
