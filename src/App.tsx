import { useEffect, Suspense } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import HomePage from './pages/HomePage';
import { demos } from './demos';
import ChatWidget from './chat/ChatWidget';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function DemoLoader() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="flex items-center gap-3 text-white/60">
        <span className="w-8 h-8 rounded-full border-2 border-lime border-t-transparent animate-spin" />
        Loading demo&hellip;
      </div>
    </main>
  );
}
function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="font-display text-6xl font-extrabold mb-4">
        404<span className="text-lime">.</span>
      </h1>
      <p className="text-white/60 mb-8">This page doesn&apos;t exist.</p>
      <a
        href="/"
        className="bg-lime text-ink font-semibold px-6 py-3 rounded-full"
      >
        Back home
      </a>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <CustomCursor />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {demos.map((d) => (
          <Route
            key={d.path}
            path={d.path}
            element={
              <Suspense fallback={<DemoLoader />}>
                <d.Component />
              </Suspense>
            }
          />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <ChatWidget />
    </BrowserRouter>
  );
}
