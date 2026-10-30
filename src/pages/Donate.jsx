import { useEffect, useState } from 'react';
import { BookOpen, ChevronLeft, Flower2, Heart, Landmark, Mail, MapPin, MessageCircle, Phone, ScrollText, Utensils, X } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link, Navigate, useParams } from 'react-router-dom';
import siteConfig from '../data/siteConfig.js';
import { photo } from '../lib/photo.js';

// Donation categories. `banner` (optional) is the temple's own photo for the strip at the top
// of the seva page, e.g. '/images/sevas/anna-daan.jpg' in public/; without it `image` is used.
// `credit` is the Wikimedia credit for representative photos; the temple's own photos have a
// plain `caption` instead. `tiers` (optional) names each amount, e.g. { 1100: 'Feed 20 devotees' }, once the temple
// confirms what each amount provides; otherwise the seva title is shown.
export const donationCategories = [
  {
    id: 'gita-daan',
    title: 'Gita Daan',
    description: 'Help share the wisdom of the Bhagavad-gita.',
    detail: 'Your Gita Daan offering helps share Bhagavad-gita books and devotional wisdom with visitors, families and the wider community.',
    image: siteConfig.images.gitaBook,
    alt: 'Bhagavad Gita book cover',
    credit: siteConfig.imageCredits.gitaBook,
    icon: BookOpen,
    amounts: [250, 500, 1100, 2100, 5100, 11000, 21000, 51000, 110000, 210000, 510000, 1100000],
  },
  {
    id: 'ekadashi-seva',
    title: 'Ekadashi Seva',
    description: 'Support devotional observances and spiritual programmes.',
    detail: 'Support Ekadashi observances and devotional programmes at Gupt Vrindavan Dham. Contact the temple for current programme details.',
    image: siteConfig.images.mayapurRadhaKrishna,
    alt: 'Radha and Krishna deities at New Mayapur',
    credit: siteConfig.imageCredits.mayapurRadhaKrishna,
    icon: Flower2,
    amounts: [251, 501, 1100, 2100, 5100, 11000, 21000, 51000],
  },
  {
    id: 'anna-daan',
    title: 'Anna Daan Seva',
    description: 'Help serve prasadam to visitors and the community.',
    detail: 'Offer Anna Daan to support the preparation and serving of prasadam to visitors and the community.',
    image: siteConfig.images.khichdiPrasadam,
    alt: 'Khichdi prasadam served in a leaf bowl at ISKCON Bangalore',
    credit: siteConfig.imageCredits.khichdiPrasadam,
    icon: Utensils,
    amounts: [251, 501, 1100, 2100, 5100, 11000, 21000, 51000],
  },
  {
    id: 'daily-deity-seva',
    title: 'Daily Deity Seva',
    description: 'Support the daily worship and care of the deities.',
    detail: 'Support the daily worship and devotional service offered to the deities at Gupt Vrindavan Dham.',
    image: siteConfig.images.vrindavanRadhaKrishna,
    alt: 'Radha and Krishna deities in Vrindavan',
    credit: siteConfig.imageCredits.vrindavanRadhaKrishna,
    icon: Flower2,
    amounts: [251, 501, 1100, 2100, 5100, 11000, 21000, 51000],
  },
  {
    id: 'sadhu-bhojan',
    title: 'Sadhu Bhojan',
    description: 'Help provide sanctified meals at the Dham.',
    detail: 'Support the preparation and offering of sanctified meals for sadhus and guests at the Dham.',
    image: siteConfig.images.prasadamDistribution,
    alt: 'Volunteers serving prasadam to visitors at an ISKCON centre',
    credit: siteConfig.imageCredits.prasadamDistribution,
    icon: Utensils,
    amounts: [251, 501, 1100, 2100, 5100, 11000, 21000, 51000],
  },
  {
    id: 'srimad-bhagavatam',
    title: 'Share Srimad-Bhagavatam',
    description: 'Support the sharing of devotional knowledge and learning.',
    detail: 'Help share Srimad-Bhagavatam and devotional learning with visitors, families and the wider community.',
    image: siteConfig.images.garden,
    alt: 'Garden at an ISKCON centre in Mayapur',
    credit: siteConfig.imageCredits.garden,
    icon: ScrollText,
    amounts: [251, 501, 1100, 2100, 5100, 11000, 21000, 51000],
  },
  {
    id: 'temple-development',
    title: 'Temple Development',
    description: 'Help build the Govardhan Dham temple, one step at a time.',
    detail: 'The Govardhan Dham temple is taking shape. Your offering supports the construction of the temple and its shared spaces, so devotees and visitors can gather for darshan, kirtan and learning for generations to come.',
    image: siteConfig.images.templeConstruction,
    alt: 'The Govardhan Dham temple building under construction',
    caption: 'Govardhan Dham · temple under construction',
    icon: Landmark,
    amounts: [1100, 2100, 5100, 11000, 21000, 51000, 110000, 210000, 510000],
  },
];

const paymentMethods = [
  { id: 'upi', label: 'UPI (demo)', icon: MessageCircle },
  { id: 'bank', label: 'Bank transfer (demo)', icon: Landmark },
  { id: 'online', label: 'Online payment (demo)', icon: Heart },
];

const inr = (amount) => `₹${Number(amount).toLocaleString('en-IN')}`;

function DonationDialog({ category, amount, onClose }) {
  const [paid, setPaid] = useState(false);
  const [method, setMethod] = useState('upi');

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-maroon/65 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section role="dialog" aria-modal="true" aria-labelledby="donation-dialog-title" className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gold bg-white px-5 py-4 sm:px-7">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-dark">{paid ? 'Demo complete' : 'Payment preview'}</p>
            <h2 id="donation-dialog-title" className="mt-1 truncate font-heading text-xl font-bold sm:text-2xl">{paid ? 'Thank you!' : category.title}</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Close donation window" className="ml-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold text-maroon hover:bg-cream">
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        {paid ? (
          <div className="space-y-5 p-5 text-center sm:p-7">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <Heart size={30} fill="currentColor" aria-hidden="true" />
            </div>
            <div>
              <p className="font-heading text-2xl font-bold text-maroon">Thank you for your generous donation!</p>
              <p className="mt-2 text-maroon/80">Your demo offering of <strong>{inr(amount)}</strong> for <strong>{category.title}</strong> has been completed.</p>
            </div>
            <p className="rounded-xl border border-amber-300 bg-amber-50 p-3 text-xs leading-5 text-amber-950">
              This is only a UI demonstration. No money was charged, and no real donation was received.
            </p>
            <button type="button" onClick={onClose} className="btn-primary w-full">Close</button>
          </div>
        ) : (
          <div className="space-y-5 p-5 sm:p-7">
            <div className="rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
              <p className="font-semibold">Demo payment · no real charge</p>
              <p className="mt-1">This preview will not connect to a bank or payment provider. No QR code is displayed.</p>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-cream p-4">
              <span className="text-sm text-maroon/75">Offering for {category.title}</span>
              <span className="text-xl font-bold text-maroon">{inr(amount)}</span>
            </div>
            <div className="grid gap-2 sm:grid-cols-3" role="group" aria-label="Demo payment methods">
              {paymentMethods.map(({ id, label, icon: Icon }) => (
                <button key={id} type="button" aria-pressed={method === id} onClick={() => setMethod(id)} className={`flex min-h-12 items-center justify-center gap-2 rounded-xl border px-3 text-sm font-medium ${method === id ? 'border-primary-dark bg-primary/20 text-maroon' : 'border-gold bg-white text-maroon/75 hover:bg-cream'}`}>
                  <Icon size={17} aria-hidden="true" /> {label}
                </button>
              ))}
            </div>
            <p className="text-xs leading-5 text-maroon/65">
              {paymentMethods.find(({ id }) => id === method)?.label} is shown for preview only. Do not enter bank credentials or share a PIN/OTP.
            </p>
            <button type="button" onClick={() => setPaid(true)} className="btn-primary w-full">Pay {inr(amount)} (demo)</button>
            <button type="button" onClick={onClose} className="btn-outline w-full">Cancel</button>
          </div>
        )}
      </section>
    </div>
  );
}

function LegacyDonationDialog({ category, initialAmount, onClose }) {
  const [paid, setPaid] = useState(false);
  const [method, setMethod] = useState('upi');
  const [step, setStep] = useState('details');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState(initialAmount ? String(initialAmount) : '');
  const { contact } = siteConfig;
  const whatsappLink = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(`Hare Krishna. I would like information about offering ${category.title}${amount ? ` of ₹${amount}` : ''}.`)}`;

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-maroon/65 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section role="dialog" aria-modal="true" aria-labelledby="donation-dialog-title" className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gold bg-white px-5 py-4 sm:px-7">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-dark">{step === 'details' ? 'Donation enquiry' : 'Payment preview'}</p>
            <h2 id="donation-dialog-title" className="mt-1 truncate font-heading text-xl font-bold sm:text-2xl">{category.title}</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Close donation window" className="ml-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold text-maroon hover:bg-cream">
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        {step === 'details' ? (
          <form
            className="space-y-4 p-5 sm:p-7"
            onSubmit={(event) => {
              event.preventDefault();
              setStep('payment');
            }}
          >
            <div className="rounded-2xl border border-primary/40 bg-primary/10 p-4 text-sm leading-6 text-maroon">
              This is a demo form for reviewing the donation experience. Details are not saved or sent.
            </div>

            <label className="block text-sm font-medium" htmlFor="donor-name">
              Full name <span className="text-red-700">*</span>
              <input id="donor-name" name="name" autoComplete="name" autoFocus required value={name} onChange={(event) => setName(event.target.value)} className="mt-1.5 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-base font-normal" />
            </label>

            <label className="block text-sm font-medium" htmlFor="donor-phone">
              Phone number <span className="text-red-700">*</span>
              <span className="mt-1.5 flex min-h-11 overflow-hidden rounded-xl border border-slate-300">
                <span className="flex items-center border-r border-slate-300 bg-cream px-3 font-normal text-maroon/75">+91</span>
                <input id="donor-phone" name="phone" type="tel" inputMode="numeric" autoComplete="tel-national" pattern="[6-9][0-9]{9}" title="Enter a valid 10-digit Indian mobile number" required value={phone} onChange={(event) => setPhone(event.target.value.replace(/\D/g, '').slice(0, 10))} className="min-w-0 flex-1 px-3 text-base font-normal" />
              </span>
            </label>

            <label className="block text-sm font-medium" htmlFor="donor-address">
              Address <span className="font-normal text-maroon/60">(optional)</span>
              <textarea id="donor-address" name="address" autoComplete="street-address" rows="2" value={address} onChange={(event) => setAddress(event.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-base font-normal" />
            </label>

            <label className="block text-sm font-medium" htmlFor="donation-amount">
              Offering amount <span className="font-normal text-maroon/60">(optional)</span>
              <span className="mt-1.5 flex min-h-11 overflow-hidden rounded-xl border border-slate-300">
                <span className="flex items-center border-r border-slate-300 bg-cream px-3 font-normal text-maroon/75">₹</span>
                <input id="donation-amount" name="amount" type="number" min="1" max="10000000" inputMode="numeric" value={amount} onChange={(event) => setAmount(event.target.value)} className="min-w-0 flex-1 px-3 text-base font-normal" placeholder="Enter amount" />
              </span>
            </label>

            <label className="flex items-start gap-2 text-xs leading-5 text-maroon/75">
              <input type="checkbox" required className="mt-1 h-4 w-4 accent-primary-dark" />
              <span>I agree to the <Link to="/privacy" onClick={onClose} className="underline underline-offset-2">Privacy Policy</Link> and <Link to="/terms" onClick={onClose} className="underline underline-offset-2">Terms &amp; Conditions</Link>. This demo does not save or transmit the details entered here.</span>
            </label>

            <button type="submit" className="btn-primary w-full">Continue to payment options</button>
          </form>
        ) : (
          <div className="space-y-5 p-5 sm:p-7">
            <div className="rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
              <p className="font-semibold">Demo preview — payments are not connected</p>
              <p className="mt-1">No donation can be made from this preview. Verified payment details will be added by the temple before launch. No QR code is displayed.</p>
            </div>

            <div className="grid gap-2 sm:grid-cols-3" role="group" aria-label="Demo payment methods">
              {paymentMethods.map(({ id, label, icon: Icon }) => (
                <button key={id} type="button" aria-pressed={method === id} onClick={() => setMethod(id)} className={`flex min-h-12 items-center justify-center gap-2 rounded-xl border px-3 text-sm font-medium ${method === id ? 'border-primary-dark bg-primary/20 text-maroon' : 'border-gold bg-white text-maroon/75 hover:bg-cream'}`}>
                  <Icon size={17} aria-hidden="true" /> {label}
                </button>
              ))}
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="font-semibold">{paymentMethods.find(({ id }) => id === method)?.label} setup pending</p>
              <p className="mt-1 text-sm leading-6 text-maroon/75">The temple’s verified payment account or payment-gateway connection will appear here when configured.</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <button type="button" onClick={() => setStep('details')} className="btn-outline w-full"><ChevronLeft size={17} aria-hidden="true" /> Edit details</button>
              <button type="button" disabled className="btn w-full cursor-not-allowed bg-slate-200 text-slate-500">I have paid · unavailable</button>
            </div>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn-primary w-full">
              Ask about donating on WhatsApp
            </a>
          </div>
        )}
      </section>
    </div>
  );
}

function DonationCategoryCard({ category, onDonate }) {
  const Icon = category.icon;
  const credit = category.credit;

  return (
    <article className="group overflow-hidden rounded-2xl border border-gold/80 bg-white shadow-soft transition-transform hover:-translate-y-1">
      <div className="relative m-2 overflow-hidden rounded-xl border-2 border-primary/60">
        <img {...photo(category.image, '(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 100vw')} alt={category.alt} loading="lazy" decoding="async" className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-56" />
        <div className="pointer-events-none absolute inset-0 border-[5px] border-double border-primary/55" aria-hidden="true" />
        <div className="absolute bottom-1 left-1 right-1 rounded-lg bg-maroon/75 px-2 py-1 text-[10px] leading-4 text-white backdrop-blur-sm">
          {credit ? (
            <>
              Representative photo · <a href={credit.url} target="_blank" rel="noopener noreferrer" className="pointer-events-auto underline underline-offset-2">{credit.author}</a>
              {' · '}<a href={credit.licenseUrl} target="_blank" rel="noopener noreferrer" className="pointer-events-auto underline underline-offset-2">{credit.license}</a>
            </>
          ) : category.caption}
        </div>
      </div>
      <div className="flex min-h-40 flex-col items-center px-4 pb-5 pt-2 text-center">
        <div className="flex items-center justify-center gap-2">
          <Icon size={17} className="text-primary-dark" aria-hidden="true" />
          <h2 className="font-heading text-lg font-bold">{category.title}</h2>
        </div>
        <p className="mt-2 max-w-sm text-sm leading-5 text-maroon/75">{category.description}</p>
        <Link to={`/donate/${category.id}`} className="btn-outline mt-4 min-h-10 rounded-lg border-slate-300 px-6 text-sm">
          Donate Now
        </Link>
      </div>
    </article>
  );
}

export default function Donate() {
  const { contact, name, brandName } = siteConfig;

  return (
    <>
      <Helmet>
        <title>Donate – {brandName}</title>
        <meta name="description" content={`Explore seva opportunities and contact ${name} for donation information.`} />
      </Helmet>

      <header className="bg-gradient-to-r from-[#4a1638] via-[#30102f] to-[#180a25] text-white">
        <div className="container-page py-8 sm:py-10">
          <p className="text-sm font-medium tracking-wide text-white/80">Offer with devotion, serve with love</p>
          <h1 className="mt-2 font-heading text-3xl font-bold sm:text-4xl">Donate to Gupt Vrindavan Dham</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/85 sm:text-base">
            Offer seva to support devotional worship, spiritual learning and service to the community.
          </p>
        </div>
      </header>

      <section className="bg-slate-50 py-6 sm:py-8" aria-labelledby="donation-categories-title">
          <div className="container-page">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 id="donation-categories-title" className="font-heading text-2xl font-bold sm:text-3xl">Choose a seva</h2>
                <p className="mt-1 text-sm text-maroon/75">Select a category to ask about making an offering.</p>
              </div>
              <p className="rounded-full border border-amber-300 bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-950">Payment preview · no QR or payment processing</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
              {donationCategories.map((category) => (
                <DonationCategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-b from-[#ffe5c7] to-primary/70 py-10 sm:py-14" aria-labelledby="donation-contact-title">
          <div className="container-page grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-7">
              <div>
                <p className="text-sm font-bold uppercase tracking-wide text-primary-dark">{name}</p>
                <h2 className="mt-2 font-heading text-2xl font-bold">Visit the Dham</h2>
                <p className="mt-2 max-w-lg text-sm leading-6 text-maroon/80">{contact.address}</p>
                <a href={contact.mapLink} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-primary-dark underline underline-offset-2">
                  <MapPin size={16} aria-hidden="true" /> View location
                </a>
              </div>
              <div>
                <p className="text-sm font-bold uppercase tracking-wide text-primary-dark">Founder-Acharya</p>
                <p className="mt-2 font-semibold">His Divine Grace A.C. Bhaktivedanta Swami Srila Prabhupada</p>
              </div>
              <div>
                <p className="text-sm font-bold uppercase tracking-wide text-primary-dark">Get in touch</p>
                <div className="mt-3 flex flex-wrap gap-x-6 gap-y-3 text-sm">
                  <a href={`tel:${contact.phoneHref}`} className="inline-flex items-center gap-2 font-medium hover:underline"><Phone size={16} aria-hidden="true" />{contact.phone}</a>
                  <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-2 font-medium hover:underline"><Mail size={16} aria-hidden="true" />{contact.email}</a>
                  <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-medium hover:underline"><MessageCircle size={16} aria-hidden="true" />WhatsApp enquiry</a>
                </div>
              </div>
            </div>

            <aside className="self-center rounded-3xl border border-primary/50 bg-white/80 p-6 shadow-soft sm:p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/25 text-primary-dark"><Heart size={24} aria-hidden="true" /></div>
              <h2 id="donation-contact-title" className="mt-4 font-heading text-2xl font-bold">Donation information</h2>
              <p className="mt-3 text-sm leading-6 text-maroon/80">
                Payment options are not connected in this preview. Contact the temple to confirm current donation methods and receipt information. We do not display a QR code or ask for a UPI PIN or OTP.
              </p>
              <a href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent('Hare Krishna. Please share current donation information for Gupt Vrindavan Dham.')}`} target="_blank" rel="noopener noreferrer" className="btn-primary mt-5 w-full sm:w-auto">
                <MessageCircle size={17} aria-hidden="true" /> Ask on WhatsApp
              </a>
            </aside>
          </div>
      </section>

    </>
  );
}

export function DonationSevaPage() {
  const { sevaId } = useParams();
  const category = donationCategories.find(({ id }) => id === sevaId);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [dialogAmount, setDialogAmount] = useState(null);

  if (!category) return <Navigate to="/donate" replace />;

  const amount = customAmount ? Number(customAmount) : selectedAmount;
  const Icon = category.icon;

  return (
    <>
      <Helmet>
        <title>{category.title} – Donate | {siteConfig.brandName}</title>
        <meta name="description" content={category.detail} />
      </Helmet>

      <div className="border-b border-slate-200 bg-white">
        <div className="container-page py-3 text-xs text-maroon/65">
          <Link to="/" className="hover:underline">Home</Link>
          <span className="px-2" aria-hidden="true">›</span>
          <Link to="/donate" className="hover:underline">Donate</Link>
          <span className="px-2" aria-hidden="true">›</span>
          <span aria-current="page" className="font-medium text-maroon">{category.title}</span>
        </div>
      </div>

      {/* A thin strip with the seva photo and its description, then the offering choices
          directly below it, running the full width of the page. */}
      <main className="bg-slate-50 py-6 sm:py-10">
        <div className="container-page space-y-5 sm:space-y-6">
          <section className="flex items-center gap-4 overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-soft sm:gap-6 sm:p-4">
            {category.banner
              ? <img src={category.banner} alt={category.alt} className="h-24 w-28 shrink-0 rounded-xl object-cover sm:h-36 sm:w-64" />
              : <img {...photo(category.image, '(min-width: 640px) 256px, 112px')} alt={category.alt} className="h-24 w-28 shrink-0 rounded-xl object-cover sm:h-36 sm:w-64" />}
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary-dark sm:text-xs">Serve the Lord, share the mercy</p>
              <h1 className="mt-1 font-heading text-xl font-bold text-maroon sm:text-3xl">{category.title}</h1>
              <p className="mt-1 text-sm leading-6 text-maroon/75 sm:mt-2 sm:text-base">{category.detail}</p>
              {!category.banner && category.credit && (
                <p className="mt-1 hidden text-[11px] text-maroon/50 sm:block">
                  Photo: <a href={category.credit.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">{category.credit.title}</a>
                  {' '}by {category.credit.author} · <a href={category.credit.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">{category.credit.license}</a>
                </p>
              )}
              {!category.credit && category.caption && <p className="mt-1 hidden text-[11px] text-maroon/50 sm:block">{category.caption}</p>}
            </div>
          </section>

          <div>
            <section aria-labelledby="choose-seva-title" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 id="choose-seva-title" className="font-heading text-2xl font-bold">Choose your offering</h2>
                <span className="rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold text-primary-dark">{category.title}</span>
              </div>
              <p className="mt-2 text-sm text-maroon/70">Tap an amount to offer it. Amounts are sample values for this preview.</p>
              <p className="mt-3 rounded-xl border border-amber-300 bg-amber-50 p-3 text-xs leading-5 text-amber-950 sm:text-sm">
                Payment setup is pending. This page is a UI preview and does not display a QR code or accept donations.
              </p>

              {/* Each option shows its amount large and its full name, so they read apart at a glance. */}
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {category.amounts.map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => {
                      setSelectedAmount(value);
                      setCustomAmount('');
                      setDialogAmount(value);
                      setShowDialog(true);
                    }}
                    className="group flex min-h-[7.5rem] flex-col justify-between gap-3 rounded-2xl border-2 border-slate-200 bg-white p-4 text-left transition-colors hover:border-primary hover:bg-primary/5 sm:p-5"
                  >
                    <span className="flex items-start justify-between gap-3">
                      <span className="font-heading text-2xl font-bold text-maroon sm:text-3xl">{inr(value)}</span>
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary-dark"><Icon size={18} aria-hidden="true" /></span>
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-maroon">{category.tiers?.[value] ?? category.title}</span>
                      <span className="mt-1 block text-xs font-semibold text-primary-dark group-hover:underline">Offer this seva →</span>
                    </span>
                  </button>
                ))}
              </div>

              <div className="mt-6 border-t border-slate-200 pt-5">
                <label htmlFor="custom-seva-amount" className="block text-sm font-semibold">Donate any amount</label>
                <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                  <div className="flex min-h-11 flex-1 overflow-hidden rounded-xl border border-slate-300">
                    <span className="flex items-center border-r border-slate-300 bg-slate-50 px-3 text-maroon/70">₹</span>
                    <input
                      id="custom-seva-amount"
                      type="number"
                      min="1"
                      max="10000000"
                      inputMode="numeric"
                      value={customAmount}
                      onChange={(event) => {
                        setCustomAmount(event.target.value);
                        setSelectedAmount(null);
                      }}
                      className="min-w-0 flex-1 px-3 text-base"
                      placeholder="Enter any amount"
                    />
                  </div>
                  <button type="button" disabled={!customAmount || !amount || amount < 1} onClick={() => { setDialogAmount(amount); setShowDialog(true); }} className="btn-primary min-h-11 rounded-xl px-6 disabled:cursor-not-allowed disabled:opacity-50">
                    Continue with custom amount
                  </button>
                </div>
                <p className="mt-3 text-xs leading-5 text-maroon/65">Sample offerings only. No payment is processed from this page.</p>
              </div>
            </section>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <Link to="/donate" className="text-sm font-medium text-primary-dark underline underline-offset-2">← Back to all donation categories</Link>
            <p className="text-xs text-maroon/60">Govardhan Dham · Jodhpur, Rajasthan</p>
          </div>
        </div>
      </main>

      {showDialog && <DonationDialog category={category} amount={dialogAmount} onClose={() => setShowDialog(false)} />}
    </>
  );
}
