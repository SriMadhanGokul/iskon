import { useState } from 'react';
import { Flower2 } from 'lucide-react';
export default function ImageWithFallback({ src, alt, width, height, className = '', eager = false }) {
  const [failed, setFailed] = useState(false);
  if (failed || !src) {
    return (
      <div role="img" aria-label={alt} className={`flex items-center justify-center bg-gradient-to-br from-gold/60 via-cream to-saffron/40 ${className}`} style={{ aspectRatio: width && height ? `${width}/${height}` : undefined }}>
        <Flower2 className="h-12 w-12 text-saffron-dark/60" aria-hidden="true" />
      </div>
    );
  }
  return <img src={src} alt={alt} width={width} height={height} loading={eager ? 'eager' : 'lazy'} decoding="async" onError={() => setFailed(true)} className={className} />;
}
