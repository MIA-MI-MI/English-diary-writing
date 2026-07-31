import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          50: '#F5F1E8',
          100: '#E8DCC8',
        },
        ink: {
          700: '#8B7355',
          800: '#6B5B4F',
          900: '#4A4238',
        },
        accent: {
          green: '#6B8E6B',
          red: '#C94C4C',
        },
      },
      fontFamily: {
        handwriting: ['Caveat', 'Dancing Script', 'Patrick Hand', 'cursive'],
      },
      boxShadow: {
        'paper': '0 2px 8px rgba(74, 66, 56, 0.1)',
        'paper-hover': '0 4px 12px rgba(74, 66, 56, 0.15)',
      },
    },
  },
  plugins: [],
}
export default config