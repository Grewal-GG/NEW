/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{jsx,js}'],
  theme: {
    extend: {
      colors: {
        surface: 'var(--color-surface)',
        elevated: 'var(--color-elevated)',
        primary: 'var(--color-primary)',
        'primary-hover': 'var(--color-primary-hover)',
        'on-surface': 'var(--color-on-surface)',
        'on-surface-muted': 'var(--color-on-surface-muted)',
        border: 'var(--color-border)',
        accent: 'var(--color-accent)',
        // Warm paper palette utilities
        paper: {
          50:  '#fffdf5',
          100: '#fef5e4',
          200: '#fde9c4',
          300: '#f8d08a',
          400: '#f3b24d',
          500: '#e8882b',
          600: '#c2410c',
          700: '#9a3412',
          800: '#7c2d12',
          900: '#1a0e05',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(28,10,0,0.06), 0 4px 16px rgba(28,10,0,0.05)',
        'card-hover': '0 8px 32px rgba(28,10,0,0.10), 0 2px 8px rgba(28,10,0,0.07)',
        result: '0 4px 24px rgba(194,65,12,0.15)',
      },
    },
  },
  plugins: [],
};
