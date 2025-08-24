import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';
import Footer from './components/Footer';
import ThemeProvider from './providers/ThemeProvider';
import { pageTransition } from './utils/animations';
import './App.css';

// Компонент для анимаций переходов между страницами
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route 
          path="/" 
          element={
            <motion.div
              variants={pageTransition}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <HomePage />
            </motion.div>
          } 
        />
        <Route 
          path="/projects" 
          element={
            <motion.div
              variants={pageTransition}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <ProjectsPage />
            </motion.div>
          } 
        />
        <Route 
          path="/contact" 
          element={
            <motion.div
              variants={pageTransition}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <ContactPage />
            </motion.div>
          } 
        />
      </Routes>
    </AnimatePresence>
  );
};

// Создаем клиент для React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 минут
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  // Определяем basename для GitHub Pages
  const basename = '/qr0d10n';
  
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Router basename={basename}>
          <motion.div 
            className="min-h-screen flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Navbar />
            
            <main className="flex-grow">
              <AnimatedRoutes />
            </main>
            
            <Footer />
          </motion.div>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
