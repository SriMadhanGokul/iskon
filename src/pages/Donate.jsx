import { ArrowRight, BookOpen, Heart, Landmark, Utensils } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import DonationCard from '../components/DonationCard.jsx';
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

  return (
    <>
      <Helmet>
        <title>Donate and offer seva – {brandName}</title>
        <meta name="description" content="Learn how donations support temple development, prasadam, cow care and devotional programmes, and choose an available seva." />
      </Helmet>
      <header className="bg-maroon text-cream">
        <div className="container-page grid items-center gap-8 py-12 sm:py-16 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-gold">Give with devotion</p>
            <h1 className="font-heading text-3xl font-bold text-white sm:text-5xl">Support devotional service</h1>
            <p className="mt-5 max-w-3xl leading-7 text-cream/85">
              Your contribution can help sustain worship, spiritual learning, prasadam service, cow care and the development of shared temple spaces. Choose a seva below to indicate the purpose you wish to support.
            </p>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-cream/70">
              Contributions and their use are handled by the temple. Contact the temple directly if you need confirmation about a particular seva or how your offering will be allocated.
            </p>
            <Link to="/annadhan" className="btn-primary mt-6">Learn about Annadhan <ArrowRight size={16} aria-hidden="true" /></Link>
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
          <p className="mt-3 leading-7 text-maroon/75">These options describe the temple’s seva categories. The temple can confirm current needs and whether a contribution can be designated for a particular purpose.</p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {donation.sevas.map((seva) => {
            const Icon = sevaIcons[seva.id] || Heart;
            return (
              <article key={seva.id} className="rounded-3xl border border-gold bg-white p-5 shadow-soft">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-saffron/20 text-saffron-dark">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-heading text-lg font-semibold">{seva.label}</h3>
                <p className="mt-2 min-h-12 text-sm leading-6 text-maroon/75">{sevaDescriptions[seva.id] || 'Support devotional programmes and community service.'}</p>
                <Link to={`/donate?seva=${encodeURIComponent(seva.id)}`} className="btn-outline mt-4 min-h-10 px-4 text-xs">Choose this seva <ArrowRight size={15} aria-hidden="true" /></Link>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-white/60 py-12 sm:py-16">
        <div className="container-page grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-saffron-dark">Make an offering</p>
            <h2 className="mt-2 font-heading text-2xl font-semibold sm:text-3xl">Select your seva and payment method</h2>
            <p className="mt-4 leading-7 text-maroon/75">Select an amount or enter a custom amount, then choose from the payment methods available below. Verify the recipient and details before confirming any payment.</p>
            <p className="mt-4 rounded-2xl border border-gold bg-cream p-4 text-sm leading-6 text-maroon/75">Do not share your UPI PIN, one-time password, card PIN or bank password with anyone. Payment details that the temple has not confirmed remain disabled or clearly marked as needing confirmation.</p>
            <Link to="/annadhan" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-saffron-dark hover:underline">Support Annadhan <ArrowRight size={15} aria-hidden="true" /></Link>
          </div>
          <DonationCard />
        </div>
      </section>
    </>
  );
}
