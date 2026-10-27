import { useEffect, useState } from 'react';
import { ArrowRight, BookOpen, Heart, Landmark, Utensils, X } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import siteConfig from '../data/siteConfig.js';

const sevaIcons = {
  sqft: Landmark,
  anna: Utensils,
  gau: Heart,
  construction: Landmark,
  festival: BookOpen,
  general: Heart,
};

const sevaDescriptions = {
  sqft: 'Support the temple development project and its shared devotional spaces.',
  anna: 'Help support prasadam and food-service activities for visitors and the community.',
  gau: 'Support compassionate care for cows through the temple’s Gau Seva.',
  construction: 'Contribute to the development of temple and community facilities.',
  festival: 'Help support devotional gatherings and festival services.',
  general: 'Offer a contribution toward the temple’s ongoing spiritual and community work.',
};

export default function Donate() {
  const { donation, brandName } = siteConfig;
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedSeva = donation.sevas.find(({ id }) => id === searchParams.get('seva')) || donation.sevas.find(({ id }) => id === 'general');
  const [dialogOpen, setDialogOpen] = useState(true);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [pincode, setPincode] = useState('');
  const [amount, setAmount] = useState('1000');

  useEffect(() => {
    if (!dialogOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setDialogOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [dialogOpen]);

  const selectSeva = (id) => {
    setSearchParams({ seva: id }, { replace: true });
    setDialogOpen(true);
  };

  const continueToCheckout = (event) => {
    event.preventDefault();
    if (!name.trim()) return;
    navigate('/donate/checkout', {
      state: {
        donor: { name: name.trim(), phone, pincode },
        amount: Number(amount),
        sevaId: selectedSeva.id,
      },
    });
  };

  return (
    <>
      <Helmet>
        <title>Donate and offer seva – {brandName}</title>
        <meta name="description" content="Choose a seva, enter your donation details and continue to the temple's local payment-options page." />
      </Helmet>
      <header className="bg-maroon text-cream">
        <div className="container-page grid items-center gap-8 py-12 sm:py-16 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-gold">Give with devotion</p>
            <h1 className="font-heading text-3xl font-bold text-white sm:text-5xl">Support devotional service</h1>
            <p className="mt-5 max-w-3xl leading-7 text-cream/85">
              Choose a service and enter your details to continue to the donation checkout. Payment options are shown on the next page.
            </p>
            <button type="button" onClick={() => setDialogOpen(true)} className="btn-primary mt-6"><Heart size={17} aria-hidden="true" />Donate now</button>
            <Link to="/annadhan" className="btn-secondary mt-3">Learn about Annadhan <ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
          <div className="hidden h-40 w-40 items-center justify-center rounded-full border border-gold/50 bg-white/5 lg:flex" aria-hidden="true">
            <Heart size={72} className="text-gold" strokeWidth={1.3} />
          </div>
        </div>
      </header>

      <section className="container-page py-12 sm:py-16" aria-labelledby="seva-purpose-heading">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-saffron-dark">Ways to contribute</p>
          <h2 id="seva-purpose-heading" className="mt-2 font-heading text-2xl font-semibold sm:text-3xl">Choose the service close to your heart</h2>
          <p className="mt-3 leading-7 text-maroon/75">Choose a seva to identify the purpose of your offering, then enter your details to continue.</p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {donation.sevas.map((seva) => {
            const Icon = sevaIcons[seva.id] || Heart;
            const selected = selectedSeva.id === seva.id;
            return (
              <article key={seva.id} className={`rounded-3xl border bg-white p-5 shadow-soft ${selected ? 'border-saffron-dark ring-2 ring-saffron/30' : 'border-gold'}`}>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-saffron/20 text-saffron-dark">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-heading text-lg font-semibold">{seva.label}</h3>
                <p className="mt-2 min-h-12 text-sm leading-6 text-maroon/75">{sevaDescriptions[seva.id] || 'Support devotional programmes and community service.'}</p>
                <button type="button" onClick={() => selectSeva(seva.id)} className={`btn-primary mt-4 min-h-10 px-4 text-xs ${selected ? 'ring-2 ring-saffron/40' : ''}`}>
                  {selected ? 'Donate for this seva' : 'Choose this seva'} <ArrowRight size={15} aria-hidden="true" />
                </button>
              </article>
            );
          })}
        </div>
      </section>

      {dialogOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-maroon/65 p-3 backdrop-blur-sm sm:p-6" role="presentation">
          <section role="dialog" aria-modal="true" aria-labelledby="donation-details-heading" className="my-auto w-full max-w-xl rounded-3xl bg-white p-5 shadow-2xl sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-saffron-dark">Donation details</p>
                <h2 id="donation-details-heading" className="mt-1 font-heading text-2xl font-semibold">Your offering to {brandName}</h2>
                <p className="mt-2 text-sm text-maroon/70">Selected seva: <span className="font-semibold text-maroon">{selectedSeva.label}</span></p>
              </div>
              <button type="button" onClick={() => setDialogOpen(false)} aria-label="Close donation form" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold text-maroon hover:bg-cream"><X size={20} aria-hidden="true" /></button>
            </div>

            <form onSubmit={continueToCheckout} className="mt-6 space-y-4">
              <div>
                <label htmlFor="donor-name" className="mb-1 block text-sm font-medium">Full name</label>
                <input id="donor-name" name="name" autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} required maxLength={100} className="min-h-12 w-full rounded-xl border border-gold bg-cream px-4" placeholder="Enter your name" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="donor-phone" className="mb-1 block text-sm font-medium">Mobile number</label>
                  <div className="flex min-h-12 items-center rounded-xl border border-gold bg-cream px-3">
                    <span className="mr-2 border-r border-gold pr-2 text-sm text-maroon/75">+91</span>
                    <input id="donor-phone" name="phone" type="tel" inputMode="numeric" autoComplete="tel-national" value={phone} onChange={(event) => setPhone(event.target.value.replace(/\D/g, '').slice(0, 10))} required pattern="[6-9][0-9]{9}" title="Enter a valid 10-digit Indian mobile number" className="min-w-0 flex-1 bg-transparent outline-none" placeholder="10-digit number" />
                  </div>
                </div>
                <div>
                  <label htmlFor="donor-pincode" className="mb-1 block text-sm font-medium">Pincode</label>
                  <input id="donor-pincode" name="pincode" inputMode="numeric" autoComplete="postal-code" value={pincode} onChange={(event) => setPincode(event.target.value.replace(/\D/g, '').slice(0, 6))} required pattern="[0-9]{6}" title="Enter a 6-digit pincode" className="min-h-12 w-full rounded-xl border border-gold bg-cream px-4" placeholder="6-digit pincode" />
                </div>
              </div>
              <fieldset>
                <legend className="mb-2 text-sm font-medium">Donation amount</legend>
                <div className="flex flex-wrap gap-2">
                  {[1000, ...donation.amounts.filter((preset) => preset !== 1000)].slice(0, 5).map((preset) => (
                    <button key={preset} type="button" aria-pressed={Number(amount) === preset} onClick={() => setAmount(String(preset))} className={`min-h-10 rounded-full border px-4 text-sm font-medium ${Number(amount) === preset ? 'border-saffron-dark bg-saffron-dark text-white' : 'border-gold bg-cream text-maroon hover:bg-gold/30'}`}>
                      ₹{preset.toLocaleString('en-IN')}
                    </button>
                  ))}
                </div>
                <label htmlFor="donation-amount" className="sr-only">Custom donation amount in rupees</label>
                <div className="mt-3 flex min-h-12 max-w-xs items-center rounded-xl border border-gold bg-cream px-4">
                  <span className="mr-2 text-maroon/70">₹</span>
                  <input id="donation-amount" name="amount" type="number" inputMode="numeric" min="1" max="10000000" step="1" value={amount} onChange={(event) => setAmount(event.target.value)} required className="min-w-0 flex-1 bg-transparent outline-none" placeholder="Enter amount" />
                </div>
              </fieldset>
              <button type="submit" className="btn-primary w-full">Continue to payment options <ArrowRight size={17} aria-hidden="true" /></button>
              <p className="text-center text-xs leading-5 text-maroon/65">Your details stay on this site and are passed to the next page only. No payment is taken in this form.</p>
            </form>
          </section>
        </div>
      )}
    </>
  );
}
