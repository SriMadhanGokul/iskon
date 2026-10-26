import siteConfig from '../data/siteConfig.js';
export default function AartiTimings() {
  return (
    <ul className="mx-auto max-w-xl divide-y divide-gold/60 rounded-2xl border border-gold bg-white px-5">
      {siteConfig.timings.map(([name, time]) => (
        <li key={name} className="flex justify-between py-3"><span>{name}</span><span className="font-medium">{time}</span></li>
      ))}
    </ul>
  );
}
