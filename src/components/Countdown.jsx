import useCountdown from '../hooks/useCountdown.js';
import siteConfig from '../data/siteConfig.js';
export default function Countdown() {
  const t = useCountdown(siteConfig.openingDate);
  const items = [['Days', t.days], ['Hours', t.hours], ['Minutes', t.minutes], ['Seconds', t.seconds]];
  return (
    <div>
      <p className="mb-2 text-sm text-gold">Grand opening on 12 May 2027</p>
      <div className="flex gap-3" role="timer" aria-label="Time until grand opening">
        {items.map(([l, v]) => (
          <div key={l} className="min-w-[64px] rounded-2xl bg-black/35 px-3 py-2 text-center backdrop-blur">
            <div className="font-heading text-2xl font-semibold tabular-nums text-white">{String(v).padStart(2, '0')}</div>
            <div className="text-xs text-gold">{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
