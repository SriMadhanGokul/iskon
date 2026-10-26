import { Copy, Check } from 'lucide-react';
import useCopyToClipboard from '../hooks/useCopyToClipboard.js';
import { isFilled } from '../data/siteConfig.js';

export default function CopyField({ label, value }) {
  const [copied, copy] = useCopyToClipboard();
  const ok = isFilled(value);
  return (
    <div className="flex items-center justify-between gap-3 border-b border-gold/60 py-2">
      <div className="min-w-0">
        <p className="text-sm text-maroon/70">{label}</p>
        <p className={`break-words font-medium ${ok ? '' : 'text-saffron-dark'}`}>{value}</p>
      </div>
      <button type="button" disabled={!ok} onClick={() => copy(value)} aria-label={`Copy ${label}`} className="btn-outline shrink-0 px-4 disabled:cursor-not-allowed disabled:opacity-40">
        {copied ? <Check size={16} /> : <Copy size={16} />}
        <span>{copied ? 'Copied' : 'Copy'}</span>
      </button>
    </div>
  );
}
