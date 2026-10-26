# Gupt Vrindavan Dham website (Phases 1–3)

## Run
    npm install
    npm run dev      # local
    npm run build    # production build in /dist

## Edit content
All text, numbers, timings, UPI and bank values live in `src/data/siteConfig.js`.
Values starting with "TO BE FILLED" are placeholders; the donation card shows them clearly and disables Copy until they are filled.

## Images
The current high-resolution WebP photos are representative images from Wikimedia Commons, not photos of Gupt Vrindavan Dham. Photo titles, authors, source pages, and licenses are listed in `public/images/CREDITS.txt` and linked beside the photos.

Replace them with temple-owned photos before launch by updating the paths in `src/data/siteConfig.js`. The sourced originals range up to 6000 × 4000 pixels; the images are served locally as WebP.

## UPI and bank
Set `donation.upi.id` and the `donation.bank` fields. The QR code appears once the UPI ID is filled. Set `has80G: true` only after the temple confirms 80G.

## Deploy
Netlify: build `npm run build`, publish `dist`, add redirect `/* /index.html 200`. Vercel: Vite preset, same output.

## Temple must confirm before launch
UPI ID, bank details, 80G status, registration numbers, impact line per amount, email, social URLs, official photos.
