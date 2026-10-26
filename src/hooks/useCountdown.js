import { useEffect, useState } from 'react';
const calc = (target) => {
  const diff = Math.max(0, new Date(target).getTime() - Date.now());
  return { days: Math.floor(diff / 864e5), hours: Math.floor(diff / 36e5) % 24, minutes: Math.floor(diff / 6e4) % 60, seconds: Math.floor(diff / 1e3) % 60 };
};
export default function useCountdown(target) {
  const [t, setT] = useState(() => calc(target));
  useEffect(() => {
    const id = setInterval(() => setT(calc(target)), 1000);
    return () => clearInterval(id);
  }, [target]);
  return t;
}
