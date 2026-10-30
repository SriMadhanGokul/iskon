import siteConfig from '../data/siteConfig.js';
import { WhatsAppIcon } from './AnnouncementBar.jsx';

// Floating "Hare Krishna" WhatsApp pill in the bottom-right corner, above the phone bottom bar.
// The number or link comes from siteConfig.whatsappButton so it can be changed in one place.
export default function WhatsAppButton() {
  const { label, number, message, link } = siteConfig.whatsappButton;
  const href = link || `https://wa.me/${number}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
  if (!link && !number) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} – chat with the temple on WhatsApp`}
      className="fixed bottom-[calc(4rem+env(safe-area-inset-bottom)+0.75rem)] right-3 z-[55] inline-flex h-12 items-center gap-2 rounded-full bg-[#25D366] pl-2 pr-4 text-sm font-bold text-white shadow-[0_10px_25px_-8px_rgba(0,0,0,0.45)] transition-transform hover:scale-105 sm:bottom-5 sm:right-5 sm:h-14 sm:pl-2.5 sm:pr-5 sm:text-base"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 sm:h-10 sm:w-10">
        <WhatsAppIcon className="h-6 w-6 sm:h-7 sm:w-7" />
      </span>
      {label}
    </a>
  );
}
