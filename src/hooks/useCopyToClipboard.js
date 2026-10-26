import { useState, useCallback } from 'react';
export default function useCopyToClipboard(resetMs = 2000) {
  const [copied, setCopied] = useState(false);
  const copy = useCallback(async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text; document.body.appendChild(ta); ta.select();
      document.execCommand('copy'); document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), resetMs);
  }, [resetMs]);
  return [copied, copy];
}
