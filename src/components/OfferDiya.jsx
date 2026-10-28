import { useCallback, useEffect, useRef, useState } from 'react';
import DeepDaanDialog from './DeepDaanDialog.jsx';
import { playDiyaSparkles } from './diyaSparkles.js';

// Embers rising from the diya flame: size and drift in container-query units, staggered timing.
const embers = [
  { size: 1.1, dx: -3, delay: 0, duration: 2.8 },
  { size: 0.8, dx: 2.5, delay: 0.9, duration: 3.2 },
  { size: 1, dx: -1.5, delay: 1.7, duration: 2.6 },
  { size: 0.7, dx: 4, delay: 2.4, duration: 3.4 },
  { size: 0.9, dx: -4.5, delay: 3.1, duration: 3 },
];

export default function OfferDiya() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const offer = () => setDialogOpen(true);
  const closeDialog = useCallback(() => setDialogOpen(false), []);
  const canvasRef = useRef(null);
  const diyaRef = useRef(null);
  const flameRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    if (navigator.connection?.saveData) return undefined;
    return playDiyaSparkles(canvasRef.current, diyaRef.current, flameRef.current);
  }, []);

  return (
    <>
      <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[61] motion-reduce:hidden" />
      <div
        ref={diyaRef}
        role="button"
        tabIndex={0}
        aria-label="Offer a diya"
        onClick={offer}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            offer();
          }
        }}
        className="fixed bottom-[8vh] right-0 z-[60] w-[clamp(160px,46vw,200px)] origin-[100%_70%] cursor-pointer select-none outline-none [container-type:inline-size] motion-safe:animate-diya-in md:w-[clamp(200px,17vw,440px)]"
      >
        <div className="relative origin-[100%_70%] motion-safe:animate-diya-aarti">
          <span className="absolute inset-0 bg-[radial-gradient(circle_38cqw_at_39.5%_54%,rgba(255,110,0,0.85)_0%,rgba(215,70,0,0.6)_25%,rgba(150,40,0,0.3)_55%,rgba(120,30,0,0)_100%)] motion-safe:animate-diya-glow" />
          <img src="/gifs/offerdiya-loop.webp" alt="" width="440" height="445" draggable="false" fetchpriority="low" decoding="async" className="relative block h-auto w-full" />
          <span ref={flameRef} className="absolute left-[39.5%] top-[54%] size-0" />
          {embers.map(({ size, dx, delay, duration }) => (
            <span
              key={delay}
              className="absolute left-[39.5%] top-[52%] rounded-full bg-gold shadow-[0_0_6px_2px_rgba(255,170,60,0.8)] motion-safe:animate-diya-ember motion-reduce:hidden"
              style={{
                width: `max(2px, ${size}cqw)`,
                height: `max(2px, ${size}cqw)`,
                '--dx': `${dx}cqw`,
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
              }}
            />
          ))}
        </div>
      </div>
      <DeepDaanDialog open={dialogOpen} onClose={closeDialog} originRef={flameRef} />
    </>
  );
}
