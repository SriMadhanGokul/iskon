import { Fragment } from 'react';
import { Link } from 'react-router-dom';

// Renders one block of article content from data/blogs.js or data/festivalPages.js.
// Turns **bold** and [label](/path) inside a block's text into elements. Links starting with
// http open in a new tab; everything else is an internal route.
export function Inline({ text }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    const bold = part.match(/^\*\*(.+)\*\*$/);
    if (bold) return <strong key={i} className="font-semibold text-maroon">{bold[1]}</strong>;
    const link = part.match(/^\[(.+)\]\((.+)\)$/);
    if (link) {
      const className = 'font-medium text-primary-dark underline decoration-primary/50 underline-offset-4 hover:decoration-primary-dark';
      return link[2].startsWith('http')
        ? <a key={i} href={link[2]} target="_blank" rel="noopener noreferrer" className={className}>{link[1]}</a>
        : <Link key={i} to={link[2]} className={className}>{link[1]}</Link>;
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

export default function ArticleBlock({ block, first }) {
  if (block.h2) return <h2 className="mt-12 scroll-mt-28 font-heading text-2xl font-bold text-maroon sm:text-[28px]">{block.h2}</h2>;
  if (block.h3) return <h3 className="mt-8 font-heading text-xl font-semibold text-maroon">{block.h3}</h3>;
  if (block.ul || block.ol) {
    const List = block.ul ? 'ul' : 'ol';
    return (
      <List className={`mt-4 space-y-2 pl-6 leading-8 text-maroon/85 ${block.ul ? 'list-disc marker:text-primary' : 'list-decimal marker:font-semibold marker:text-primary-dark'}`}>
        {(block.ul ?? block.ol).map((item) => <li key={item} className="pl-1"><Inline text={item} /></li>)}
      </List>
    );
  }
  if (block.table) {
    const { heading, caption, headers, rows } = block.table;
    return (
      <section className="my-10">
        {heading && (
          <h2 className="inline-block font-heading text-2xl font-bold text-maroon sm:text-[28px]">
            {heading}
            <span className="mt-1.5 block h-1 w-10 rounded-full bg-primary" aria-hidden="true" />
          </h2>
        )}
        {caption && <p className="mb-4 mt-3 text-sm text-maroon/70"><Inline text={caption} /></p>}
        <div className="overflow-x-auto rounded-2xl border border-gold/70 shadow-soft">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-primary/15">
              <tr>
                {headers.map((header) => (
                  <th key={header} scope="col" className="whitespace-nowrap px-4 py-3 text-xs font-bold uppercase tracking-wider text-primary-dark">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.join('|')} className="border-t border-gold/50 transition-colors odd:bg-white even:bg-cream/60 hover:bg-primary/10">
                  {row.map((cell, i) => (
                    <td key={i} className={`px-4 py-3 align-top leading-relaxed text-maroon/85 ${i === 0 ? 'whitespace-nowrap font-semibold text-maroon' : ''}`}><Inline text={cell} /></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    );
  }
  if (block.photos) {
    return (
      <figure className="mx-auto my-8 max-w-4xl">
        <div className="grid gap-3 sm:grid-cols-2 md:gap-4">
          {block.photos.map((image) => (
            <img key={image.src} src={image.src} alt={image.alt} loading="lazy" decoding="async" width="800" height="1000" className="aspect-[4/5] w-full rounded-2xl border border-gold/60 bg-cream object-cover" />
          ))}
        </div>
        {block.caption && <figcaption className="mt-3 text-center text-sm italic text-maroon/65">{block.caption}</figcaption>}
      </figure>
    );
  }
  if (block.mantra) {
    return (
      <blockquote className="my-6 rounded-2xl border-l-4 border-primary bg-gradient-to-r from-primary/15 to-transparent px-6 py-5 font-heading text-lg italic leading-9 text-maroon">
        {block.mantra.map((line) => <span key={line} className="block">{line}</span>)}
      </blockquote>
    );
  }
  return (
    <p className={`mt-4 leading-8 text-maroon/85 ${first ? 'first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-heading first-letter:text-6xl first-letter:font-bold first-letter:leading-[0.85] first-letter:text-primary-dark md:first-letter:text-7xl' : ''}`}>
      <Inline text={block.p} />
    </p>
  );
}
