import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  ArrowRight, BookOpen, Building2, CalendarDays, Flower2, HandHeart,
  Heart, MapPin, Music2, Utensils,
} from 'lucide-react';
import siteConfig from '../data/siteConfig.js';
import Hero from '../components/Hero.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import ProgressBar from '../components/ProgressBar.jsx';
import AartiTimings from '../components/AartiTimings.jsx';

const places = [
  { title: 'Gau Seva', text: 'Learn about compassionate cow care and ways to support animal welfare through seva.', icon: HandHeart, image: siteConfig.images.gauSeva, imageAlt: 'Vechur cow photographed in India', credit: siteConfig.imageCredits.gauSeva, to: '/mandir/gaushala' },
  { title: 'Bhoga & prasadam', text: 'A devotional fruit offering, one part of preparing prasadam for temple programmes and visitors.', icon: Utensils, image: siteConfig.images.prasadam, imageAlt: 'Fruit arranged as a devotional offering', credit: siteConfig.imageCredits.prasadam, to: '/activities/food-distribution' },
  { title: 'Harinama Kirtan', text: 'A glimpse of Hare Krishna devotees gathered in devotional music and chanting.', icon: Music2, image: siteConfig.images.kirtan, imageAlt: 'Hare Krishna devotees taking part in kirtan', credit: siteConfig.imageCredits.kirtan, to: '/activities/kirtan' },
  { title: 'Temple Gardens', text: 'A representative garden photo from ISKCON Mayapur; visit information for Gupt Vrindavan Dham is available below.', icon: Flower2, image: siteConfig.images.garden, imageAlt: 'Garden at ISKCON Mayapur', credit: siteConfig.imageCredits.garden, to: '/mandir/garden' },
];

const activities = [
  { title: 'Harinama Kirtan', text: 'Join devotees in the congregational chanting of the holy names.', icon: Music2, to: '/activities/kirtan' },
  { title: 'Gita & Bhagavatam', text: 'Explore timeless spiritual teachings through classes and discussion.', icon: BookOpen, to: '/activities/education' },
  { title: 'Annadhan', text: 'Learn how food seva and prasadam support visitors and the community.', icon: Utensils, to: '/annadhan' },
  { title: 'Cow protection', text: 'Help sustain compassionate care for cows through dedicated seva.', icon: HandHeart, to: '/activities/cow-protection' },
];

const faqs = [
  { question: 'Where is Gupt Vrindavan Dham?', answer: `The temple is in Jagatpura, Jaipur. The address is ${siteConfig.contact.address}.` },
  { question: 'When can I attend darshan and aarti?', answer: 'Daily worship and class timings are listed below. Please contact the temple before travelling to confirm any festival or seasonal changes.' },
  { question: 'What can visitors do at the Dham?', answer: 'Visitors can attend darshan, join kirtan and spiritual programmes, learn about seva activities, and explore the temple grounds.' },
];

function IconCard({ title, text, icon: Icon, index, image, imageAlt, credit, to }) {
  return (
    <article className="group rounded-3xl border border-gold/80 bg-white p-5 shadow-soft transition-transform hover:-translate-y-1 sm:p-6">
      {image && (
        <figure className="-mx-5 -mt-5 mb-5 overflow-hidden rounded-t-3xl sm:-mx-6 sm:-mt-6">
          <img src={image} alt={imageAlt} width="1200" height="800" loading="lazy" decoding="async" className="aspect-[16/10] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
          <figcaption className="bg-cream px-3 py-2 text-[11px] leading-4 text-maroon/75">
            Photo: <a href={credit.url} target="_blank" rel="noopener noreferrer" className="font-medium underline underline-offset-2">{credit.title}</a> by {credit.author} · <a href={credit.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">{credit.license}</a>
          </figcaption>
        </figure>
      )}
      <div className="mb-6 flex items-center justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-saffron/20 text-saffron-dark"><Icon size={23} aria-hidden="true" /></span>
        <span className="font-heading text-sm text-maroon/45">{String(index).padStart(2, '0')}</span>
      </div>
      <h3 className="text-lg font-semibold">{to ? <Link to={to} className="hover:text-saffron-dark">{title}</Link> : title}</h3>
      <p className="mt-2 text-sm leading-6 text-maroon/75">{text}</p>
      {to && <Link to={to} className="btn-outline mt-5 min-h-10 px-4 text-xs">Discover <ArrowRight size={15} aria-hidden="true" /></Link>}
    </article>
  );
}

export default function Home() {
  const { stats } = siteConfig;

  useEffect(() => {
    const targetId = window.location.hash.slice(1);
    if (targetId) {
      window.requestAnimationFrame(() => {
        document.getElementById(targetId)?.scrollIntoView();
      });
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>{siteConfig.brandName} – Krishna Temple in Jaipur</title>
        <meta name="description" content="Plan a visit to Gupt Vrindavan Dham in Jagatpura, Jaipur. Explore temple spaces, daily worship, spiritual programmes and ways to serve." />
        <meta property="og:title" content={`${siteConfig.brandName}, Jaipur`} />
        <meta property="og:type" content="website" />
      </Helmet>

      <Hero />

      <section id="mandir" className="container-page scroll-mt-24 py-16 sm:py-20">
        <div className="grid items-end gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-saffron-dark">Welcome to the Dham</p>
            <h2 className="max-w-2xl font-heading text-3xl font-semibold leading-tight sm:text-4xl">A place to gather, learn and serve</h2>
          </div>
          <p className="max-w-xl leading-7 text-maroon/80">Gupt Vrindavan Dham is a growing spiritual and cultural centre in Jaipur. Its programmes bring devotional practice, community service and the teachings of Krishna together.</p>
        </div>
        <div className="mt-8 grid gap-4 rounded-3xl bg-maroon p-6 text-cream sm:grid-cols-3 sm:p-8">
          <div><p className="font-heading text-3xl font-semibold text-gold">3.5 lakh</p><p className="mt-1 text-sm text-cream/80">square feet planned for the temple and cultural centre</p></div>
          <div className="border-gold/30 sm:border-l sm:pl-6"><p className="font-heading text-3xl font-semibold text-gold">Jagatpura</p><p className="mt-1 text-sm text-cream/80">a spiritual destination in Jaipur, Rajasthan</p></div>
          <div className="border-gold/30 sm:border-l sm:pl-6"><p className="font-heading text-3xl font-semibold text-gold">Daily seva</p><p className="mt-1 text-sm text-cream/80">worship, learning and service for the community</p></div>
        </div>
      </section>

      <section className="bg-white/60 py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading title="Discover the Dham" sub="Choose a place or experience to learn more and plan your visit." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {places.map((place, index) => <IconCard key={place.title} {...place} index={index + 1} />)}
          </div>
        </div>
      </section>

      <section id="prabhupada" className="container-page scroll-mt-24 py-16 sm:py-20">
        <div className="grid overflow-hidden rounded-[2rem] border border-gold bg-cream md:grid-cols-[0.8fr_1.2fr]">
        <figure className="relative min-h-64 overflow-hidden bg-gold/30">
          <img src={siteConfig.images.about} alt="Samadhi Mandir of Srila Prabhupada in Mayapur" width="1200" height="800" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
          <figcaption className="absolute inset-x-3 bottom-3 rounded-xl bg-maroon/85 px-3 py-2 text-xs text-cream backdrop-blur-sm">
            Photo: <a href={siteConfig.imageCredits.about.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">{siteConfig.imageCredits.about.title}</a> by {siteConfig.imageCredits.about.author} · <a href={siteConfig.imageCredits.about.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">{siteConfig.imageCredits.about.license}</a>
          </figcaption>
        </figure>
          <div className="p-7 sm:p-10">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-saffron-dark">The inspiration</p>
            <h2 className="font-heading text-3xl font-semibold">A vision rooted in Krishna consciousness</h2>
            <p className="mt-4 leading-7 text-maroon/80">The Dham follows the teachings and devotional mission of Srila Prabhupada. Through worship, study and practical service, it aims to make spiritual life accessible to people and families across Jaipur.</p>
            <Link to="/prabhupada" className="btn-outline mt-6">Explore our programmes <ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <section className="bg-saffron/10 py-16 sm:py-20">
        <div className="container-page">
          <div className="grid items-end gap-5 md:grid-cols-[1fr_auto]">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-saffron-dark">Be part of something meaningful</p>
              <h2 className="font-heading text-3xl font-semibold sm:text-4xl">Ways to offer seva</h2>
              <p className="mt-3 max-w-2xl leading-7 text-maroon/80">Choose a service close to your heart. Every offering helps support the Dham’s devotional and community programmes.</p>
            </div>
            <Link to="/donate" className="btn-primary">View seva options <ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              { title: 'Temple development', text: 'Contribute to the continued development of the temple and its shared spaces.', icon: Building2, seva: 'sqft' },
              { title: 'Anna Daan', text: 'Support prasadam and food-service efforts for visitors and the wider community.', icon: Utensils, seva: 'anna' },
              { title: 'Gau Seva', text: 'Help provide care and support for the temple’s cow-protection work.', icon: HandHeart, seva: 'gau' },
            ].map(({ title, text, icon: Icon, seva }, index) => (
              <Link key={title} to={`/donate?seva=${seva}`} className="flex min-h-52 flex-col rounded-3xl border border-gold bg-white p-6 shadow-soft transition-transform hover:-translate-y-1">
                <Icon size={26} className="mb-5 text-saffron-dark" aria-hidden="true" />
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-maroon/75">{text}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-saffron-dark">Offer this seva <ArrowRight size={15} aria-hidden="true" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16 sm:py-20">
        <div className="grid items-center gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-saffron-dark">Temple development</p>
            <h2 className="font-heading text-3xl font-semibold sm:text-4xl">A shared offering, one step at a time</h2>
            <p className="mt-4 leading-7 text-maroon/80">Support the ongoing square-foot seva and help bring the temple project closer to completion.</p>
            <Link to="/donate?seva=sqft" className="btn-primary mt-6">Contribute to the project</Link>
          </div>
          <div className="rounded-3xl border border-gold bg-white p-6 shadow-soft sm:p-8">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div><p className="font-semibold">Square Feet Seva</p><p className="mt-1 text-sm text-maroon/70">Temple project progress</p></div>
              <span className="rounded-full bg-saffron/20 px-3 py-1 text-sm font-semibold text-saffron-dark">{Math.round((stats.sqftRaised / stats.sqftTotal) * 100)}%</span>
            </div>
            <ProgressBar value={stats.sqftRaised} total={stats.sqftTotal} />
            <p className="mt-4 text-sm text-maroon/70">{stats.sqftRaised.toLocaleString('en-IN')} of {stats.sqftTotal.toLocaleString('en-IN')} square feet</p>
          </div>
        </div>
      </section>

      <section className="bg-white/60 py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading title="Life at the Dham" sub="Celebrate, learn and share devotional moments throughout the year." />
          <div className="grid gap-4 md:grid-cols-3">
            <IconCard title="Festival gatherings" text="Join the community for devotional celebrations and special days in the Vaishnava calendar." icon={CalendarDays} index={1} to="/festivals" />
            <IconCard title="Music & kirtan" text="Experience the joy of devotional music and congregational chanting." icon={Music2} index={2} to="/activities/kirtan" />
            <IconCard title="Learning together" text="Take part in classes and conversations on the Bhagavad Gita and Srimad Bhagavatam." icon={BookOpen} index={3} to="/activities/education" />
          </div>
        </div>
      </section>

      <section id="activities" className="scroll-mt-24 bg-white/60 py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading title="Programmes & activities" sub="Join a regular programme, learn with the community or find a way to serve." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {activities.map((activity, index) => <IconCard key={activity.title} {...activity} index={index + 1} />)}
          </div>
        </div>
      </section>

      <section id="visitor-info" className="container-page scroll-mt-24 py-16 sm:py-20">
        <SectionHeading title="Plan your visit" sub="Find the temple, check the daily worship schedule and get in touch before you travel." />
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <h3 className="mb-4 font-heading text-xl font-semibold">Daily darshan & aarti</h3>
            <AartiTimings />
          </div>
          <div className="flex flex-col rounded-3xl bg-maroon p-6 text-cream sm:p-8">
            <MapPin size={28} className="mb-5 text-gold" aria-hidden="true" />
            <h3 className="font-heading text-2xl font-semibold text-white">Visit Gupt Vrindavan Dham</h3>
            <p className="mt-3 leading-7 text-cream/80">{siteConfig.contact.address}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={siteConfig.contact.mapLink} target="_blank" rel="noopener noreferrer" className="btn-primary">Get directions</a>
              <a href={`tel:${siteConfig.contact.phoneHref}`} className="btn-secondary">Call the temple</a>
            </div>
            <p className="mt-auto pt-8 text-sm text-gold">Please confirm timings on festival days.</p>
          </div>
        </div>
      </section>

      <section className="bg-saffron/10 py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading title="Visitor questions" sub="A few helpful details before you make your way to the temple." />
          <div className="mx-auto max-w-3xl divide-y divide-gold/80 rounded-3xl border border-gold bg-white px-5 shadow-soft sm:px-7">
            {faqs.map(({ question, answer }, index) => (
              <details key={question} className="group py-5" open={index === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold marker:hidden">
                  <span><span className="mr-3 text-sm text-saffron-dark">{String(index + 1).padStart(2, '0')}</span>{question}</span>
                  <span className="text-xl text-saffron-dark transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="max-w-2xl pl-9 pt-3 text-sm leading-6 text-maroon/75">{answer}</p>
              </details>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/donate" className="btn-outline"><Heart size={16} aria-hidden="true" /> Find a way to serve</Link>
            <span className="ml-3 inline-flex items-center gap-1 text-sm text-maroon/70"><HandHeart size={16} aria-hidden="true" /> You are welcome at the Dham</span>
          </div>
        </div>
      </section>

      <section className="container-page py-16 sm:py-20">
        <div className="grid items-center gap-6 rounded-[2rem] bg-maroon px-6 py-10 text-cream sm:px-10 md:grid-cols-[1fr_auto]">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-gold">Get involved</p>
            <h2 className="font-heading text-3xl font-semibold text-white">Share your time in service</h2>
            <p className="mt-3 max-w-2xl leading-7 text-cream/80">Volunteers help welcome visitors and support educational, devotional and community-service programmes at the Dham.</p>
          </div>
          <Link to="/contact" className="btn-primary justify-self-start md:justify-self-end">Contact the temple <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
      </section>
    </>
  );
}
