import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Splash GIF for 1.9s on first load, then the page fades up into place.
export default function Preloader({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <div key="preloader" className="fixed z-50 flex min-h-screen w-screen items-center justify-center bg-[#fdfcff]">
          <img src="/gifs/main-preloader.gif" alt="Gupt Vrindavan Dham" className="h-[13.5rem] w-[13.5rem] object-cover" />
        </div>
      ) : (
        <motion.div key="content" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: 'easeOut' }}>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
