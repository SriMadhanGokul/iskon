import { useEffect, useState } from 'react';
export default function ProgressBar({ value, total }) {
  const pct = Math.round((value / total) * 100);
  const [w, setW] = useState(0);
  useEffect(() => { const id = requestAnimationFrame(() => setW(pct)); return () => cancelAnimationFrame(id); }, [pct]);
  const f = (n) => n.toLocaleString('en-IN');
  return (
    <div>
      <p className="mb-2 font-medium">{f(value)} of {f(total)} sq. ft. ({pct}%)</p>
      <div className="h-4 overflow-hidden rounded-full bg-gold/40" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Square feet seva progress">
        <div className="h-full rounded-full bg-saffron-dark transition-[width] duration-1000 ease-out" style={{ width: `${w}%` }} />
      </div>
    </div>
  );
}
