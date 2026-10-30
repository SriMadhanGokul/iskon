import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ImagePlus, Info, Trash2, Upload, X } from 'lucide-react';
import siteConfig from '../data/siteConfig.js';
import { DARSHAN_TYPES, DEFAULT_DARSHAN_TYPE, FESTIVAL_DARSHANS } from '../data/darshans.js';
import { addDarshanPhotos, deleteDarshanPhoto, useUploadedDarshans } from '../lib/darshanStore.js';

const OTHER = '__other';
const todayIST = () => new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
const longDate = (iso) => new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-IN', { timeZone: 'UTC', day: 'numeric', month: 'long', year: 'numeric' });
const typeLabel = (id) => DARSHAN_TYPES.find((t) => t.id === id)?.label ?? id;
const fieldClass = 'mt-1.5 min-h-11 w-full rounded-xl border border-gold bg-white px-3 text-maroon outline-none focus:ring-2 focus:ring-primary';

// Upload page for darshan photos: choose the date and darshan (or festival), add photos and a
// caption, and they appear in the gallery under that darshan.
export default function DarshanUpload() {
  const [params] = useSearchParams();
  const today = todayIST();
  const uploaded = useUploadedDarshans();

  const [date, setDate] = useState(() => (/^\d{4}-\d{2}-\d{2}$/.test(params.get('date') ?? '') && params.get('date') <= today ? params.get('date') : today));
  const [type, setType] = useState(() => (DARSHAN_TYPES.some((t) => t.id === params.get('type')) ? params.get('type') : DEFAULT_DARSHAN_TYPE));
  const [festivalChoice, setFestivalChoice] = useState(FESTIVAL_DARSHANS[0]);
  const [otherFestival, setOtherFestival] = useState('');
  const [caption, setCaption] = useState('');
  const [files, setFiles] = useState([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(null);
  const [error, setError] = useState('');

  const previews = useMemo(() => files.map((file) => ({ file, url: URL.createObjectURL(file) })), [files]);
  useEffect(() => () => previews.forEach(({ url }) => URL.revokeObjectURL(url)), [previews]);

  const festival = type === 'festival' ? (festivalChoice === OTHER ? otherFestival.trim() : festivalChoice) : '';
  const canSave = files.length > 0 && date && (type !== 'festival' || festival) && !saving;

  const addFiles = (list) => {
    const images = [...list].filter((file) => file.type.startsWith('image/'));
    setFiles((current) => [...current, ...images]);
    setSaved(null);
    setError(images.length < list.length ? 'Only image files can be added.' : '');
  };

  const save = async (event) => {
    event.preventDefault();
    if (!canSave) return;
    setSaving(true);
    setError('');
    try {
      const count = await addDarshanPhotos({ date, type, festival, caption: caption.trim(), files });
      setSaved({ count, date, type, festival });
      setFiles([]);
      setCaption('');
    } catch {
      setError('The photos could not be saved in this browser. Please try again, or use fewer or smaller photos.');
    } finally {
      setSaving(false);
    }
  };

  const galleryLink = ({ date: d, type: t, festival: f }) => {
    const search = new URLSearchParams();
    if (d !== today) search.set('date', d);
    if (t !== DEFAULT_DARSHAN_TYPE) search.set('type', t);
    if (f) search.set('fest', f);
    const query = search.toString();
    return `/mandir/darshans${query ? `?${query}` : ''}`;
  };

  // This device's uploads, grouped by date, newest date first.
  const byDate = Object.entries(uploaded.reduce((groups, photo) => {
    (groups[photo.date] ??= []).push(photo);
    return groups;
  }, {})).sort(([a], [b]) => b.localeCompare(a));

  return (
    <>
      <Helmet>
        <title>Upload darshan photos – {siteConfig.brandName}</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <header className="bg-gradient-to-br from-maroon via-[#6b2409] to-primary-dark text-white">
        <div className="container-page py-10 sm:py-12">
          <Link to="/mandir/darshans" className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/85 hover:text-white"><ArrowLeft size={16} aria-hidden="true" /> Back to darshan gallery</Link>
          <h1 className="mt-4 font-heading text-3xl font-bold sm:text-5xl">Upload darshan photos</h1>
          <p className="mt-3 max-w-2xl text-white/85">Choose the date and which darshan the photos are from: one of the daily darshans or a festival darshan. They will appear in the gallery under that darshan.</p>
        </div>
      </header>

      <div className="container-page grid gap-8 py-8 sm:py-12 lg:grid-cols-[minmax(0,1fr)_340px]">
        <form onSubmit={save} className="space-y-6 rounded-3xl border border-gold/70 bg-white p-5 shadow-soft sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-sm font-semibold text-maroon">
              Darshan date
              <input type="date" value={date} max={today} required onChange={(event) => setDate(event.target.value)} className={fieldClass} />
            </label>
            <label className="block text-sm font-semibold text-maroon">
              Darshan
              <select value={type} onChange={(event) => setType(event.target.value)} className={fieldClass}>
                {DARSHAN_TYPES.map(({ id, label, note }) => <option key={id} value={id}>{label} darshan · {note}</option>)}
              </select>
            </label>
          </div>

          {type === 'festival' && (
            <div className="grid gap-5 rounded-2xl bg-cream p-4 sm:grid-cols-2">
              <label className="block text-sm font-semibold text-maroon">
                Festival
                <select value={festivalChoice} onChange={(event) => setFestivalChoice(event.target.value)} className={fieldClass}>
                  {FESTIVAL_DARSHANS.map((name) => <option key={name} value={name}>{name}</option>)}
                  <option value={OTHER}>Other festival (type the name)</option>
                </select>
              </label>
              {festivalChoice === OTHER && (
                <label className="block text-sm font-semibold text-maroon">
                  Festival name
                  <input type="text" value={otherFestival} required maxLength={60} onChange={(event) => setOtherFestival(event.target.value)} placeholder="e.g. Tulasi Vivaha" className={fieldClass} />
                </label>
              )}
            </div>
          )}

          <label className="block text-sm font-semibold text-maroon">
            Caption <span className="font-normal text-maroon/60">(optional)</span>
            <input type="text" value={caption} maxLength={120} onChange={(event) => setCaption(event.target.value)} placeholder="e.g. Sri Sri Radha Shyamsundar in white lace" className={fieldClass} />
          </label>

          <div>
            <p className="text-sm font-semibold text-maroon">Photos</p>
            <label
              className="mt-1.5 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-primary/50 bg-primary/5 px-4 py-8 text-center transition hover:bg-primary/10"
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => { event.preventDefault(); addFiles(event.dataTransfer.files); }}
            >
              <ImagePlus size={30} className="text-primary-dark" aria-hidden="true" />
              <span className="font-semibold text-maroon">Tap to choose photos, or drop them here</span>
              <span className="text-xs text-maroon/60">JPG, PNG or WebP · large photos are resized to save space</span>
              <input type="file" accept="image/*" multiple className="sr-only" onChange={(event) => { addFiles(event.target.files); event.target.value = ''; }} />
            </label>
            {previews.length > 0 && (
              <ul className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
                {previews.map(({ file, url }, i) => (
                  <li key={url} className="relative">
                    <img src={url} alt={file.name} className="aspect-square w-full rounded-xl object-cover ring-1 ring-gold/70" />
                    <button type="button" onClick={() => setFiles((current) => current.filter((_, j) => j !== i))} aria-label={`Remove ${file.name}`} className="absolute right-1 top-1 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"><X size={14} aria-hidden="true" /></button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>}
          {saved && (
            <p role="status" className="flex flex-wrap items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-900">
              <CheckCircle2 size={18} aria-hidden="true" />
              Saved {saved.count} photo{saved.count === 1 ? '' : 's'} to {saved.festival || typeLabel(saved.type)} darshan, {longDate(saved.date)}.
              <Link to={galleryLink(saved)} className="font-semibold underline underline-offset-4">View in gallery</Link>
            </p>
          )}

          <button type="submit" disabled={!canSave} className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto">
            <Upload size={17} aria-hidden="true" />
            {saving ? 'Saving…' : files.length ? `Save ${files.length} photo${files.length === 1 ? '' : 's'}` : 'Save photos'}
          </button>
        </form>

        <aside className="space-y-6">
          <div className="flex gap-3 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
            <Info size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
            <p>Photos are saved in <strong>this browser only</strong> for now, so they show in the gallery on this device. Publishing them for every visitor needs online photo storage to be connected to the site.</p>
          </div>

          <div className="rounded-3xl border border-gold/70 bg-white p-5 shadow-soft">
            <h2 className="font-heading text-xl font-bold text-maroon">Uploaded on this device</h2>
            {byDate.length === 0 && <p className="mt-3 text-sm text-maroon/65">No photos uploaded yet.</p>}
            <div className="mt-3 space-y-5">
              {byDate.map(([day, photos]) => (
                <div key={day}>
                  <p className="text-xs font-bold uppercase tracking-wider text-primary-dark">{longDate(day)}</p>
                  <ul className="mt-2 space-y-2">
                    {photos.map((photo) => (
                      <li key={photo.id} className="flex items-center gap-3">
                        <Link to={galleryLink(photo)} className="shrink-0"><img src={photo.url} alt="" className="h-12 w-12 rounded-lg object-cover ring-1 ring-gold/70" /></Link>
                        <span className="min-w-0 flex-1 text-sm">
                          <span className="block truncate font-semibold text-maroon">{photo.festival || typeLabel(photo.type)} darshan</span>
                          {photo.caption && <span className="block truncate text-xs text-maroon/60">{photo.caption}</span>}
                        </span>
                        <button type="button" onClick={() => deleteDarshanPhoto(photo.id)} aria-label="Delete this photo" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-maroon/60 hover:bg-red-50 hover:text-red-700"><Trash2 size={16} aria-hidden="true" /></button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
