import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ThemeProvider from './providers/ThemeProvider';
import HomePage from './pages/HomePage';
import Footer from './components/Footer';
import TerminalHeader from './components/ui/TerminalHeader';
import MatrixRain from './components/ui/MatrixRain';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <BrowserRouter basename={import.meta.env.DEV ? "" : "/qr0d10n"}>
          <div className="min-h-screen bg-[var(--cyber-dark)] text-white relative overflow-hidden">
            <MatrixRain />
            
            <TerminalHeader />
            
            <div className="fixed top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--neon-cyan)] to-transparent animate-scan-line opacity-30 pointer-events-none" />
            
            <main className="relative z-10">
              <HomePage />
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
