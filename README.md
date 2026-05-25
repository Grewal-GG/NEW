# 🧮 Calculator Hub

> **40+ free online calculators** for math, finance, health, unit conversion, and more — wrapped in a warm, fast, animated UI.

[![React](https://img.shields.io/badge/React-18-61dafb?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646cff?logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Docker](https://img.shields.io/badge/Docker-ready-2496ed?logo=docker&logoColor=white)](https://hub.docker.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## ✨ Features

- **40 calculators** across 6 categories — Math, Financial, Health, Date & Time, Unit Converters, and Other
- **Warm paper theme** — cream, amber, red, and dark-brown palette with full dark mode
- **Smooth animations** — page transitions, spring-in result cards, count-up number effects (Framer Motion)
- **Instant search** — type anything to find a calculator by name, keyword, or description
- **Mobile-first** — responsive layout with bottom navigation on small screens
- **Zero backend** — pure client-side JS with no external math libraries
- **Code-split** — each calculator loads on demand for fast initial page load
- **Docker ready** — one command to run in production via nginx

---

## 📐 Calculator Categories

| Category | Calculators |
|---|---|
| **Math** | Basic, Scientific, Percentage, Fraction, Triangle, Square Root, Exponent, Logarithm, Standard Deviation, Random Number |
| **Financial** | Mortgage (+ amortization table), Loan, Auto Loan, Compound Interest, Simple Interest, Investment, Retirement, Tip, Sales Tax, Discount |
| **Health** | BMI, Calorie/TDEE, Body Fat (US Navy), Pregnancy Due Date, Ovulation, Ideal Weight |
| **Date & Time** | Date Difference, Age, Time Calculator, Days Until Countdown |
| **Converters** | Length, Weight, Temperature, Volume, Area, Speed |
| **Other** | Grade, GPA, Fuel Economy, Password Generator |

---

## 🚀 Quick Start

### Option 1 — Docker (recommended, no Node.js needed)

```bash
# Clone
git clone https://github.com/Grewal-GG/NEW.git
cd NEW

# Build and run (production nginx, port 3000)
docker compose up --build

# Open in browser
open http://localhost:3000
```

### Option 2 — Docker dev server (hot reload)

```bash
docker compose --profile dev up calc-hub-dev
# Open http://localhost:5173
```

### Option 3 — Local Node.js

```bash
# Requires Node.js 18+
git clone https://github.com/Grewal-GG/NEW.git
cd NEW

npm install
npm run dev       # dev server → http://localhost:5173
npm run build     # production build → dist/
npm run preview   # preview production build locally
```

---

## 🐳 Docker Details

The multi-stage `Dockerfile` keeps the final image small:

| Stage | Base image | Purpose |
|---|---|---|
| `builder` | `node:20-alpine` | Install deps & run `vite build` |
| `runner` | `nginx:1.27-alpine` | Serve `dist/` with SPA routing & gzip |

The final image is ~25 MB and includes gzip, SPA fallback routing, immutable asset caching, and security headers.

```bash
# Build image manually
docker build -t calc-hub .

# Run container
docker run -p 3000:80 calc-hub
```

---

## 🛠️ Tech Stack

| Tool | Role |
|---|---|
| [React 18](https://react.dev) | UI framework |
| [Vite 5](https://vitejs.dev) | Build tool & dev server |
| [Tailwind CSS 3](https://tailwindcss.com) | Utility-first styling |
| [Framer Motion 11](https://www.framer.com/motion/) | Animations & transitions |
| [React Router v6](https://reactrouter.com) | Client-side routing |

All math formulas are implemented as **pure JavaScript** — no external calculation libraries.

---

## 📁 Project Structure

```
src/
├── components/
│   ├── calculator/     # CalculatorLayout, ConverterTemplate, FormulaInfo
│   ├── home/           # HeroSection, CategoryGrid, CategoryCard
│   ├── layout/         # Header, Sidebar, BottomNav, PageWrapper
│   └── ui/             # Button, InputField, ResultCard, SearchBar, ...
├── context/            # ThemeContext (dark/light mode)
├── hooks/              # useCountUp, useLocalStorage
├── pages/              # One file per calculator (lazy-loaded)
│   ├── math/
│   ├── financial/
│   ├── health/
│   ├── datetime/
│   ├── converters/
│   └── other/
├── router/routes.js    # Single source of truth for all routes & metadata
└── utils/              # math.js, financial.js, health.js, datetime.js, converters.js
```

---

## 🎨 Theme

The warm paper theme uses CSS custom properties — both light and dark mode are a single variable swap:

| Token | Light | Dark |
|---|---|---|
| `--color-surface` | `#fef5e4` (cream) | `#1a0e05` (dark brown) |
| `--color-elevated` | `#fffdf5` (warm white) | `#2b1a0a` (rich brown) |
| `--color-primary` | `#c2410c` (burnt orange-red) | `#f59e0b` (amber) |
| `--color-accent` | `#b45309` (dark amber) | `#fb923c` (light orange) |

---

## 📄 License

MIT — free to use, modify, and deploy.
