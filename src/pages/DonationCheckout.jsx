import { useState } from 'react';
import { ArrowLeft, Building, Check, ChevronRight, Clock3, CreditCard, QrCode, Wallet } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link, Navigate, useLocation } from 'react-router-dom';
import UpiQr, { upiLink } from '../components/UpiQr.jsx';
import siteConfig, { isFilled } from '../data/siteConfig.js';

const paymentMethods = [
  { id: 'upi', label: 'UPI / QR', icon: QrCode },
  { id: 'card', label: 'Card', icon: CreditCard },
  { id: 'wallet', label: 'Wallets', icon: Wallet },
  { id: 'netbanking', label: 'Net Banking', icon: Building },
  { id: 'paylater', label: 'Paylater', icon: Clock3 },
  { id: 'emi', label: 'EMI', icon: CreditCard },
];

const inr = (amount) => `₹${Number(amount).toLocaleString('en-IN')}`;

export default function DonationCheckout() {
  const { state } = useLocation();
  const [method, setMethod] = useState('upi');
  const donor = state?.donor;
  const amount = Number(state?.amount);
  const seva = siteConfig.donation.sevas.find(({ id }) => id === state?.sevaId);

  if (!donor || !Number.isSafeInteger(amount) || amount < 1 || !seva) {
    return <Navigate to="/donate" replace />;
  }

  const upiReady = isFilled(siteConfig.donation.upi.id);
  const paymentLink = upiReady ? upiLink(amount, `${seva.label} donation`) : '';

  return (
    <>
      <Helmet>
        <title>Payment options – {siteConfig.brandName}</title>
        <meta name="description" content="Review your offering and available payment options." />
      </Helmet>
      <section className="min-h-[calc(100vh-7rem)] bg-cream px-3 py-8 sm:px-6 sm:py-12">
        <div className="mx-auto grid max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl md:grid-cols-[0.92fr_1.08fr]">
          <aside className="flex flex-col bg-primary p-5 text-maroon sm:p-7">
            <div className="flex items-center justify-between border-b border-maroon/20 pb-4 text-xs font-medium">
              <span className="inline-flex items-center gap-2"><Check size={16} aria-hidden="true" /> Your details are ready</span>
              <span>INR</span>
            </div>
            <Link to={`/donate?seva=${encodeURIComponent(seva.id)}`} className="mt-5 inline-flex w-fit items-center gap-2 text-sm text-maroon/90 hover:text-maroon">
              <ArrowLeft size={17} aria-hidden="true" /> Change details
            </Link>
            <div className="flex flex-1 flex-col items-center justify-center py-8 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/45 text-2xl font-bold">G</div>
              <h1 className="mt-3 font-heading text-2xl font-semibold">Gupt Vrindavan Dham</h1>
              <p className="mt-1 text-sm text-maroon/80">{seva.label}</p>
              <div className="mt-6 flex w-full max-w-xs items-center justify-between rounded-2xl bg-white/40 px-5 py-4">
                <span className="text-sm text-maroon/85">Donation amount</span>
                <span className="text-xl font-semibold">{inr(amount)}</span>
              </div>
              <div className="mt-5 w-full max-w-xs text-left text-sm text-maroon/85">
                <p className="truncate">Donor: {donor.name}</p>
                <p className="mt-1">+91 {donor.phone}</p>
                {donor.pincode && <p className="mt-1">Pincode: {donor.pincode}</p>}
              </div>
            </div>
            <p className="text-center text-xs text-maroon/75">Review your details before choosing a payment method.</p>
          </aside>

          <div className="bg-[#fafafa] p-5 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-medium">Payment options for +91 {donor.phone}</h2>
              <Link to={`/donate?seva=${encodeURIComponent(seva.id)}`} className="text-sm font-semibold text-primary-dark hover:underline">Change</Link>
            </div>

            <section aria-label="Selected payment method" className="mt-5 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
              {method === 'upi' ? (
                <div>
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold">Scan and pay with UPI</p>
                      <p className="mt-1 text-xs text-slate-500">Use any UPI app to make your offering</p>
                    </div>
                    <span className="rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold text-primary-dark">UPI / QR</span>
                  </div>
                  {upiReady ? (
                    <div className="grid items-center gap-4 sm:grid-cols-[180px_1fr]">
                      <div className="rounded-xl border border-slate-100 p-2"><UpiQr amount={amount} note={`${seva.label} donation`} /></div>
                      <div>
                        <p className="text-sm text-slate-600">Scan this QR with your UPI app and verify the payee and amount before confirming.</p>
                        <a href={paymentLink} className="btn-primary mt-4">Open UPI app</a>
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-xl bg-amber-50 p-4 text-sm leading-6 text-amber-950">
                      <p className="font-semibold">UPI QR is not configured yet</p>
                      <p className="mt-1">The temple’s verified UPI ID must be added before this page can create a real QR code or accept payment.</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="min-h-36 content-center rounded-xl bg-amber-50 p-4 text-sm leading-6 text-amber-950">
                  <p className="font-semibold">{paymentMethods.find(({ id }) => id === method)?.label} payment is not connected</p>
                  <p className="mt-1">This payment option needs the temple’s payment-gateway integration before it can process a transaction.</p>
                </div>
              )}
            </section>

            <div className="mt-6">
              <h3 className="mb-3 text-sm font-medium text-slate-600">Other payment options</h3>
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                {paymentMethods.map(({ id, label, icon: Icon }) => (
                  <button key={id} type="button" aria-pressed={method === id} onClick={() => setMethod(id)} className={`flex min-h-12 w-full items-center gap-3 border-b border-slate-100 px-4 text-left last:border-b-0 ${method === id ? 'bg-primary/15 text-primary-dark' : 'text-slate-800 hover:bg-slate-50'}`}>
                    <Icon size={19} aria-hidden="true" />
                    <span className="flex-1 text-sm font-medium">{label}</span>
                    {method === id && <span className="text-xs font-medium">Selected</span>}
                    <ChevronRight size={17} aria-hidden="true" />
                  </button>
                ))}
              </div>
            </div>

            <p className="mt-5 rounded-xl border border-slate-200 bg-white p-3 text-xs leading-5 text-slate-600">
              Payment methods are shown as a checkout preview. A verified payment gateway and temple-approved payment details are required before transactions can be completed. Never share your UPI PIN or OTP.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
