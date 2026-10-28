// Every /images/<name>.webp photo also exists as <name>-640/-1280/-1920.webp.
// Spread photo(src, sizes) onto an <img> so the browser downloads only the width it needs.
const WIDTHS = [640, 1280, 1920];

export function photo(src, sizes) {
  const base = src?.match(/^(\/images\/[\w-]+)\.webp$/)?.[1];
  if (!base) return { src };
  return {
    src: `${base}-1280.webp`,
    srcSet: WIDTHS.map((w) => `${base}-${w}.webp ${w}w`).join(', '),
    sizes,
  };
}
