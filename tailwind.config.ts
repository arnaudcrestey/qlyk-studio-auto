import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B0B0B',
        foreground: '#F5F5F5',
        technical: '#2A2A2A',
        premium: '#3A6FF7'
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'serif']
      },
      boxShadow: {
        premium: '0 12px 35px rgba(0, 0, 0, 0.4)'
      }
    }
  },
  plugins: []
};

export default config;
