// Auto-scrolling strip of deity photos. It never pauses on hover, so it keeps moving while you scroll.
// Photos are from Wikimedia Commons under CC BY-SA licences; each credit is shown under the strip.
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const TILES = [
  { slug: 'banke-bihari-vrindavan', alt: 'Banke Bihari deity, Vrindavan', credit: { title: 'Banke Bihari Vrindavan', author: 'Kridha20', license: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Banke_Bihari_Vrindavan.jpg', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/' } },
  { slug: 'banke-bihari-40', alt: 'Banke Bihari deity, Vrindavan', credit: { title: 'Banke bihari (40)', author: 'Guptaele', license: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Banke_bihari_(40).JPG', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/' } },
  { slug: 'banke-bihari-42', alt: 'Banke Bihari deity, Vrindavan', credit: { title: 'Banke bihari (42)', author: 'Guptaele', license: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Banke_bihari_(42).JPG', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/' } },
  { slug: 'banke-bihari-484', alt: 'Banke Bihari deity, Vrindavan', credit: { title: 'Banke bihari (484)', author: 'Guptaele', license: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Banke_bihari_(484).JPG', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/' } },
  { slug: 'banke-bihari-50', alt: 'Banke Bihari deity, Vrindavan', credit: { title: 'Banke bihari (50)', author: 'Guptaele', license: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Banke_bihari_(50).JPG', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/' } },
  { slug: 'radha-syamasundar', alt: 'Radha and Syamasundar deities, Vrindavan', credit: { title: 'Radha Syamasundar Vrindavan Radhastami 2004', author: 'Sahadeva', license: 'CC BY-SA 3.0', url: 'https://commons.wikimedia.org/wiki/File:Radha_Syamasundar_Vrindavan_Radhastami_2004.jpg', licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/' } },
];

const srcSet = (slug) => `/images/deity/${slug}-640.webp 640w, /images/deity/${slug}-1280.webp 1280w`;

const DARSHANS_PATH = '/mandir/darshans';

export default function PhotoStrip() {
  const { pathname } = useLocation();
  const credits = TILES.map(({ credit }) => credit);
  return (
    <section aria-label="Photo gallery" className="overflow-hidden bg-white/60 py-12 sm:py-16">
      <div className="flex w-max gap-5 motion-safe:animate-photo-strip">
        {[...TILES, ...TILES].map(({ slug, alt }, i) => (
          <figure key={i} aria-hidden={i >= TILES.length || undefined} className="h-64 w-72 shrink-0 overflow-hidden rounded-3xl border border-gold/60 shadow-soft sm:h-80 sm:w-96">
            <img src={`/images/deity/${slug}-640.webp`} srcSet={srcSet(slug)} sizes="(min-width: 640px) 384px, 288px" alt={i < TILES.length ? alt : ''} width="1280" height="960" loading="lazy" decoding="async" className="h-full w-full object-cover" />
          </figure>
        ))}
      </div>
      {pathname !== DARSHANS_PATH && (
        <div className="mt-8 flex justify-center px-4">
          <Link to={DARSHANS_PATH} className="btn-primary shadow-soft">View more darshan <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
      )}
      <p className="mt-6 px-4 text-center text-[11px] leading-5 text-maroon/70">
        {credits.map((credit, i) => (
          <span key={credit.url}>
            {i > 0 && ' · '}
            Photo: <a href={credit.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">{credit.title}</a> by {credit.author} (<a href={credit.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">{credit.license}</a>)
          </span>
        ))}
      </p>
    </section>
  );
}
