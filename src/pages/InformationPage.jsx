import { ArrowRight, Clock3, ExternalLink, Mail, MapPin, Phone } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import AartiTimings from '../components/AartiTimings.jsx';
import siteConfig from '../data/siteConfig.js';

function Photo({ image, className = 'aspect-[16/10]' }) {
  if (!image) return null;
  const { credit } = image;
  return (
    <figure className={`overflow-hidden rounded-3xl border border-gold/70 bg-cream ${className}`}>
      <img src={image.src} alt={image.alt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
      {credit && (
        <figcaption className="bg-cream px-3 py-2 text-xs leading-5 text-maroon/75">
          Representative image · <a href={credit.url} target="_blank" rel="noopener noreferrer" className="font-medium underline underline-offset-2">{credit.title}</a> by {credit.author} · <a href={credit.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">{credit.license}</a>
        </figcaption>
      )}
    </figure>
  );
}

function PageCard({ card }) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-gold/80 bg-white shadow-soft transition-transform hover:-translate-y-1">
      <Photo image={card.image} className="aspect-[16/10] rounded-none border-0" />
      <div className="p-5">
        <h3 className="font-heading text-xl font-semibold"><Link to={card.to} className="hover:text-saffron-dark">{card.title}</Link></h3>
        <p className="mt-2 text-sm leading-6 text-maroon/75">{card.text}</p>
        <Link to={card.to} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-saffron-dark">Read more <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-1" /></Link>
      </div>
    </article>
  );
}

function ContactDetails() {
  const { contact } = siteConfig;
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <a href={`tel:${contact.phoneHref}`} className="flex items-start gap-4 rounded-2xl border border-gold bg-white p-5 shadow-soft">
        <Phone className="mt-1 shrink-0 text-saffron-dark" aria-hidden="true" />
        <span><span className="block font-semibold">Call the temple</span><span className="mt-1 block text-sm text-maroon/75">{contact.phone}</span></span>
      </a>
      <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 rounded-2xl border border-gold bg-white p-5 shadow-soft">
        <Phone className="mt-1 shrink-0 text-saffron-dark" aria-hidden="true" />
        <span><span className="block font-semibold">WhatsApp</span><span className="mt-1 block text-sm text-maroon/75">Message the temple team</span></span>
      </a>
      <a href={`mailto:${contact.email}`} className="flex items-start gap-4 rounded-2xl border border-gold bg-white p-5 shadow-soft">
        <Mail className="mt-1 shrink-0 text-saffron-dark" aria-hidden="true" />
        <span><span className="block font-semibold">Email</span><span className="mt-1 block break-all text-sm text-maroon/75">{contact.email}</span></span>
      </a>
      <a href={contact.mapLink} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 rounded-2xl border border-gold bg-white p-5 shadow-soft">
        <MapPin className="mt-1 shrink-0 text-saffron-dark" aria-hidden="true" />
        <span><span className="block font-semibold">Temple address</span><span className="mt-1 block text-sm leading-6 text-maroon/75">{contact.address}</span></span>
      </a>
    </div>
  );
}

export default function InformationPage({ page }) {
  if (!page) return null;

  return (
    <>
      <Helmet>
        <title>{page.title} – {siteConfig.brandName}</title>
        <meta name="description" content={page.description} />
      </Helmet>

      <header className="bg-maroon text-cream">
        <div className="container-page grid items-center gap-8 py-10 sm:py-14 lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-gold">{page.eyebrow}</p>
            <h1 className="font-heading text-3xl font-bold leading-tight text-white sm:text-5xl">{page.title}</h1>
            <p className="mt-5 max-w-2xl leading-7 text-cream/90">{page.description}</p>
          </div>
          <Photo image={page.image} className="aspect-[16/10] border-gold/50" />
        </div>
      </header>

      <div className="container-page py-10 sm:py-14">
        <p className="mx-auto max-w-4xl text-lg leading-8 text-maroon/85">{page.intro}</p>

        {page.highlights && (
          <ul className="mt-8 grid gap-3 sm:grid-cols-3">
            {page.highlights.map((highlight) => (
              <li key={highlight} className="rounded-2xl border border-gold bg-white p-4 text-center font-medium shadow-soft">{highlight}</li>
            ))}
          </ul>
        )}

        {page.showTimings && (
          <section className="mt-12 grid gap-8 lg:grid-cols-2">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <Clock3 className="text-saffron-dark" aria-hidden="true" />
                <h2 className="font-heading text-2xl font-semibold">Published daily worship timings</h2>
              </div>
              <AartiTimings />
              <p className="mt-3 text-sm leading-6 text-maroon/70">Timings may change on festival days. Please confirm with the temple before travelling.</p>
            </div>
            {page.showDirections && <Directions />}
          </section>
        )}

        {page.contactDetails && (
          <section className="mt-10">
            <h2 className="mb-5 font-heading text-2xl font-semibold">Contact options</h2>
            <ContactDetails />
          </section>
        )}

        {page.sections?.map((section) => (
          <section key={section.title} className="mt-12 border-t border-gold/70 pt-10">
            <div className={section.image ? 'grid items-start gap-7 lg:grid-cols-2' : 'max-w-4xl'}>
              <div>
                <h2 className="font-heading text-2xl font-semibold sm:text-3xl">{section.title}</h2>
                <p className="mt-4 leading-7 text-maroon/80">{section.text}</p>
              </div>
              {section.image && <Photo image={section.image} className="aspect-[16/10]" />}
            </div>
            {section.timeline && (
              <ol className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {section.timeline.map(([year, text]) => (
                  <li key={`${year}-${text}`} className="rounded-2xl border border-gold bg-white p-5 shadow-soft">
                    <span className="font-heading text-2xl font-semibold text-saffron-dark">{year}</span>
                    <p className="mt-2 text-sm leading-6 text-maroon/80">{text}</p>
                  </li>
                ))}
              </ol>
            )}
          </section>
        ))}

        {page.cards?.length > 0 && (
          <section className="mt-14 border-t border-gold/70 pt-10">
            <h2 className="mb-6 font-heading text-2xl font-semibold sm:text-3xl">{page.path === '/gallery' ? 'Explore the photo collection' : page.path === '/festivals' ? 'Festival guides' : 'Explore more'}</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {page.cards.map((card) => <PageCard key={card.to} card={card} />)}
            </div>
          </section>
        )}

        {page.showDirections && !page.showTimings && (
          <section className="mt-10">
            <h2 className="mb-5 font-heading text-2xl font-semibold">Find the temple</h2>
            <Directions />
          </section>
        )}

        {page.cta && (
          <div className="mt-12 flex flex-wrap items-center gap-4 rounded-3xl bg-maroon p-6 text-cream sm:p-8">
            <div className="flex-1">
              <h2 className="font-heading text-2xl font-semibold text-white">Learn more or get in touch</h2>
              <p className="mt-2 text-sm text-cream/80">Contact the temple to confirm current details and arrangements.</p>
            </div>
            <Link to={page.cta.to} className="btn-primary">{page.cta.label} <ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
        )}
      </div>
    </>
  );
}

function Directions() {
  const { contact } = siteConfig;
  return (
    <aside className="rounded-3xl bg-maroon p-6 text-cream sm:p-8">
      <MapPin size={26} className="mb-4 text-gold" aria-hidden="true" />
      <h2 className="font-heading text-2xl font-semibold text-white">Gupt Vrindavan Dham</h2>
      <p className="mt-3 leading-7 text-cream/85">{contact.address}</p>
      <div className="mt-5 flex flex-wrap gap-3">
        <a href={contact.mapLink} target="_blank" rel="noopener noreferrer" className="btn-primary">Get directions <ExternalLink size={16} aria-hidden="true" /></a>
        <a href={`tel:${contact.phoneHref}`} className="btn-secondary">Call {contact.phone}</a>
      </div>
    </aside>
  );
}
