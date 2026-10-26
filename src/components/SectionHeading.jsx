export default function SectionHeading({ title, sub, center = true }) {
  return (
    <div className={`mb-8 ${center ? 'text-center' : ''}`}>
      <h2 className="text-2xl font-semibold sm:text-3xl">{title}</h2>
      <div className={`my-3 h-px w-24 bg-gold ${center ? 'mx-auto' : ''}`} />
      {sub && <p className={`prose-line text-maroon/80 ${center ? 'mx-auto' : ''}`}>{sub}</p>}
    </div>
  );
}
