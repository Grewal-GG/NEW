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
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)',
        'card-hover': '0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)',
        result: '0 4px 24px rgba(59,130,246,0.15)',
      },
    },
  },
  plugins: [],
};
