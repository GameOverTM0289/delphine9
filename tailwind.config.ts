import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        navy: { 50: '#f0f3f7', 100: '#dce3ed', 200: '#b9c7db', 300: '#8fa5c3', 400: '#6683ab', 500: '#4c6a94', 600: '#3d5578', 700: '#33455f', 800: '#1e293b', 900: '#0f172a' },
        sand: { 50: '#fdfcfa', 100: '#f5f3ef', 200: '#ebe7df', 300: '#ddd6c9', 400: '#c9bfad', 500: '#b5a791' },
        // Delphine landing page background
        beige: '#E8DACB',
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        chronica: ['"Chronica Pro"', 'ui-serif', 'Georgia', 'Times New Roman', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;
