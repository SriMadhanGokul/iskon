import { QRCodeSVG } from 'qrcode.react';
import { Smartphone } from 'lucide-react';
import siteConfig, { isFilled } from '../data/siteConfig.js';
import CopyField from './CopyField.jsx';

export const upiLink = (amount, note) => {
  const { id, payeeName } = siteConfig.donation.upi;
  const p = new URLSearchParams({ pa: id, pn: payeeName, cu: 'INR', tn: note });
  if (amount > 0) p.set('am', String(amount));
  return `upi://pay?${p.toString()}`;
};

export default function UpiQr({ amount, note }) {
  const { id } = siteConfig.donation.upi;
  const ready = isFilled(id);
  const link = ready ? upiLink(amount, note) : '';
  return (
    <div className="grid items-center gap-5 sm:grid-cols-[200px_1fr]">
      <div className="mx-auto flex h-[200px] w-[200px] items-center justify-center rounded-2xl border border-gold bg-white p-3">
        {ready ? <QRCodeSVG value={link} size={176} level="M" title="UPI payment QR code" /> : <p className="text-center text-sm text-saffron-dark">The QR code appears once the temple adds its UPI ID</p>}
      </div>
      <div>
        <CopyField label="UPI ID" value={id} />
        {ready && <a href={link} className="btn-primary mt-4 w-full sm:hidden"><Smartphone size={18} aria-hidden="true" /> Pay with any UPI app</a>}
      </div>
    </div>
  );
}
