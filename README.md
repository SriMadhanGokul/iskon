# Gupt Vrindavan Dham website (Phases 1–3)

## Run
    npm install
    npm run dev      # local
    npm run build    # production build in /dist

## Edit content
Site-wide contact details, timings, donation settings and image paths live in `src/data/siteConfig.js`. Standalone page copy and navigation cards live in `src/data/pages.js`; each entry is automatically registered as a route.
Values starting with "TO BE FILLED" are placeholders; the donation card shows them clearly and disables Copy until they are filled.

## Images
The current high-resolution WebP photos are representative images from Wikimedia Commons, not photos of Gupt Vrindavan Dham. Photo titles, authors, source pages, and licenses are listed in `public/images/CREDITS.txt` and linked beside the photos.

Replace them with temple-owned photos before launch by updating the paths in `src/data/siteConfig.js`. The sourced originals range up to 6000 × 4000 pixels; the images are served locally as WebP.
The guest-house page uses a representative hotel-room photo; it is not an image of the temple's own guest house.

## UPI and bank
Set `donation.upi.id` and the `donation.bank` fields. The QR code appears once the UPI ID is filled. Set `has80G: true` only after the temple confirms 80G.

## Deploy
Netlify: build `npm run build`, publish `dist`, add redirect `/* /index.html 200`. Vercel: Vite preset, same output.

## Temple must confirm before launch
UPI ID, bank details, 80G status, registration numbers, impact line per amount, social URLs, official photos.
