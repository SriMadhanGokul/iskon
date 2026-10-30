// Darshan photos uploaded from /mandir/darshans/upload, kept in this browser's IndexedDB.
// They show in the gallery on this device only: publishing them to every visitor needs
// online storage (a server or cloud bucket) behind this same interface.
import { useEffect, useState } from 'react';

const DB_NAME = 'darshan-uploads';
const STORE = 'photos';
const CHANGED = 'darshan-uploads-changed';
const MAX_SIDE = 1600;

function openDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => request.result.createObjectStore(STORE, { keyPath: 'id' });
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function run(mode, action) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, mode);
    const result = action(tx.objectStore(STORE));
    tx.oncomplete = () => { db.close(); resolve(result?.result); };
    tx.onerror = () => { db.close(); reject(tx.error); };
  });
}

// Scales a photo down so its longer side is at most MAX_SIDE, saved as JPEG.
async function shrink(file) {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
  if (scale === 1 && file.type === 'image/jpeg') return file;
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  return new Promise((resolve) => canvas.toBlob((blob) => resolve(blob ?? file), 'image/jpeg', 0.85));
}

// Saves photos under one date and darshan. `festival` is set only for festival darshans.
export async function addDarshanPhotos({ date, type, festival, caption, files }) {
  const records = await Promise.all(files.map(async (file, i) => ({
    id: `${Date.now()}-${i}-${Math.random().toString(36).slice(2, 8)}`,
    date, type, festival: festival || null, caption: caption || '',
    blob: await shrink(file),
    createdAt: Date.now() + i,
  })));
  await run('readwrite', (store) => records.forEach((record) => store.put(record)));
  window.dispatchEvent(new Event(CHANGED));
  return records.length;
}

export async function deleteDarshanPhoto(id) {
  await run('readwrite', (store) => store.delete(id));
  window.dispatchEvent(new Event(CHANGED));
}

// All uploaded photos, newest first, each with an object URL for display (revoked on change).
export function useUploadedDarshans() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    let urls = [];
    let cancelled = false;
    const load = async () => {
      const records = await run('readonly', (store) => store.getAll()).catch(() => []);
      if (cancelled) return;
      urls.forEach((url) => URL.revokeObjectURL(url));
      const next = (records ?? []).sort((a, b) => b.createdAt - a.createdAt).map((record) => {
        const url = URL.createObjectURL(record.blob);
        return { ...record, blob: undefined, url };
      });
      urls = next.map((photo) => photo.url);
      setPhotos(next);
    };
    load();
    window.addEventListener(CHANGED, load);
    return () => {
      cancelled = true;
      window.removeEventListener(CHANGED, load);
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  return photos;
}
