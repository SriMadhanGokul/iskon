import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ShieldCheck, ReceiptText, MessageCircle, QrCode, Landmark, Globe } from 'lucide-react';
import siteConfig from '../data/siteConfig.js';
import UpiQr from './UpiQr.jsx';
import CopyField from './CopyField.jsx';

const inr = (n) => '₹' + Number(n).toLocaleString('en-IN');
const METHODS = [
  { id: 'upi', label: 'UPI / QR', icon: QrCode },
  { id: 'bank', label: 'Bank transfer', icon: Landmark },
  { id: 'online', label: 'Online', icon: Globe },
];

export default function DonationCard() {
  const { donation, contact } = siteConfig;
  const [params] = useSearchParams();
  const requestedSeva = params.get('seva');
  const initial = donation.sevas.find((s) => s.id === requestedSeva)?.id || 'general';
  const [seva, setSeva] = useState(initial);
  const [amount, setAmount] = useState(donation.amounts[1]);
  const [custom, setCustom] = useState('');
  const [method, setMethod] = useState('upi');

  useEffect(() => {
    const selectedSeva = donation.sevas.find((item) => item.id === requestedSeva);
    setSeva(selectedSeva?.id || 'general');
  }, [donation.sevas, requestedSeva]);

  const finalAmount = custom ? Number(custom) : amount;
  const sevaLabel = donation.sevas.find((s) => s.id === seva).label;
  const impact = !custom && donation.impact[amount];
  const wa = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(`Hare Krishna. I have donated ${finalAmount ? inr(finalAmount) : ''} for ${sevaLabel}. Please find my payment confirmation. Name: `)}`;
  const chip = (on) => `min-h-[44px] border transition-colors ${on ? 'border-saffron-dark bg-saffron-dark text-white' : 'border-gold bg-cream hover:bg-gold/30'}`;

  return (
    <section aria-labelledby="donate-heading" className="rounded-3xl border border-gold bg-white p-5 shadow-soft sm:p-8">
      <h2 id="donate-heading" className="text-2xl font-semibold sm:text-3xl">Offer your seva</h2>
      <p className="prose-line mt-2 text-maroon/80">Your offering supports daily worship, free prasadam, cow care and the completion of the temple.</p>

      <fieldset className="mt-6">
        <legend className="mb-2 font-medium">Choose a seva</legend>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {donation.sevas.map((s) => (
            <button key={s.id} type="button" aria-pressed={seva === s.id} onClick={() => setSeva(s.id)} className={`${chip(seva === s.id)} rounded-xl px-3 py-2 text-left text-sm`}>{s.label}</button>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-6">
        <legend className="mb-2 font-medium">Choose an amount</legend>
        <div className="flex flex-wrap gap-2">
          {donation.amounts.map((a) => (
            <button key={a} type="button" aria-pressed={!custom && amount === a} onClick={() => { setAmount(a); setCustom(''); }} className={`${chip(!custom && amount === a)} rounded-full px-5 font-medium`}>{inr(a)}</button>
          ))}
        </div>
        <label className="mt-3 block text-sm" htmlFor="custom-amount">Or enter another amount (₹)</label>
        <input id="custom-amount" inputMode="numeric" value={custom} onChange={(e) => setCustom(e.target.value.replace(/\D/g, '').slice(0, 8))} className="mt-1 min-h-[44px] w-full max-w-xs rounded-xl border border-gold bg-cream px-4" placeholder="For example, 3000" />
        {impact && <p className="mt-3 text-sm text-teal">{impact}</p>}
      </fieldset>

      <div className="mt-8 rounded-2xl bg-cream p-4 sm:p-5">
        <div role="tablist" aria-label="Payment method" className="mb-4 grid grid-cols-3 gap-2">
          {METHODS.map(({ id, label, icon: Icon }) => (
            <button key={id} role="tab" aria-selected={method === id} onClick={() => setMethod(id)} className={`flex min-h-[44px] items-center justify-center gap-2 rounded-xl border px-2 text-sm font-medium ${method === id ? 'border-primary bg-primary text-maroon' : 'border-gold bg-white'}`}>
              <Icon size={16} aria-hidden="true" /> {label}
            </button>
          ))}
        </div>
        <div role="tabpanel">
          {method === 'upi' && <UpiQr amount={finalAmount} note={sevaLabel} />}
          {method === 'bank' && (
            <div>
              <CopyField label="Account name" value={donation.bank.accountName} />
              <CopyField label="Bank" value={donation.bank.bankName} />
              <CopyField label="Account number" value={donation.bank.accountNumber} />
              <CopyField label="IFSC" value={donation.bank.ifsc} />
              <CopyField label="Branch" value={donation.bank.branch} />
            </div>
          )}
          {method === 'online' && (
            <div>
              <p className="mb-3">Card and net-banking payments need the temple’s payment-gateway integration before they can be accepted.</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-gold p-4">
        <p className="font-medium">After you pay</p>
        <p className="mt-1 text-sm text-maroon/80">Send your payment confirmation on WhatsApp so the temple can share your receipt.</p>
        <a className="btn-outline mt-3" href={wa} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} aria-hidden="true" /> Send confirmation on WhatsApp</a>
      </div>

      <ul className="mt-6 grid gap-2 text-sm sm:grid-cols-3">
        <li className="flex items-center gap-2"><ShieldCheck size={18} className="text-teal" aria-hidden="true" /> Secure payment options</li>
        <li className="flex items-center gap-2"><ReceiptText size={18} className="text-teal" aria-hidden="true" /> Receipt provided</li>
        {donation.has80G && <li className="flex items-center gap-2"><ReceiptText size={18} className="text-teal" aria-hidden="true" /> Tax benefit under 80G</li>}
      </ul>
      <p className="mt-4 rounded-xl bg-gold/30 p-3 text-sm">Official donations are accepted only through the details on this page. We never ask for your PIN or OTP.</p>
    </section>
  );
}
