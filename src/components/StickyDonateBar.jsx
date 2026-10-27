import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
export default function StickyDonateBar() {
  const [show, setShow] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  if (!show || pathname.startsWith('/donate')) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gold bg-cream/95 p-3 backdrop-blur md:hidden">
      <Link to="/donate" className="btn-primary w-full">Donate Now</Link>
    </div>
  );
}
