import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import BottomNav from './components/layout/BottomNav';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import NotFoundPage from './pages/NotFoundPage';
import { ROUTES } from './router/routes';

// Lazy load all calculator pages
const CALCULATOR_COMPONENTS = {};
ROUTES.forEach(route => {
  const [, category, component] = route.path.split('/');
  CALCULATOR_COMPONENTS[route.path] = React.lazy(() =>
    import(`./pages/${category}/${route.component}.jsx`)
  );
});

function CalculatorSkeleton() {
  return (
    <div className="max-w-2xl mx-auto animate-pulse">
      <div className="h-4 w-32 bg-border rounded mb-4" />
      <div className="h-8 w-64 bg-border rounded mb-2" />
      <div className="h-4 w-48 bg-border rounded mb-8" />
      <div className="bg-elevated rounded-2xl border border-border p-8">
        <div className="space-y-4">
          {[1, 2, 3].map(i => <div key={i} className="h-12 bg-surface rounded-xl" />)}
        </div>
      </div>
    </div>
  );
}

function AppRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/:category" element={<CategoryPage />} />
        {ROUTES.map(route => {
          const Component = CALCULATOR_COMPONENTS[route.path];
          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                <Suspense fallback={<CalculatorSkeleton />}>
                  <Component />
                </Suspense>
              }
            />
          );
        })}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-surface flex flex-col">
          <Header />
          <div className="flex flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 gap-8 pb-20 lg:pb-6">
            <Sidebar />
            <main className="flex-1 min-w-0">
              <AppRoutes />
            </main>
          </div>
          <BottomNav />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}
