import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
export default function NotFound() {
  return (
    <div className="container-page py-24 text-center">
      <Helmet><title>Page not found – Gupt Vrindavan Dham</title><meta name="robots" content="noindex" /></Helmet>
      <h1 className="text-3xl font-semibold">This page could not be found</h1>
      <p className="mt-3">It may have moved, or the page is not built yet.</p>
      <Link to="/" className="btn-primary mt-6">Back to home</Link>
    </div>
  );
}
