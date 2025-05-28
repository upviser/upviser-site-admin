import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'main': '#2167e5',
        'bg': '#fbfbfe',
        'border': '#e2e2f3'
      },
      boxShadow: {
        'popup': '0px 3px 10px 3px #11111115',
        'popup-dark': '0px 3px 10px 3px #111111',
        'card': '0px 3px 10px 3px #f9f9f9',
        'card-dark': '0px 3px 10px 3px #111111'
      }
    },
  },
}
export default config
