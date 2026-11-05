// Email address as selectable text, plus a Copy button that reads
// "Copied" for 2 seconds.

"use client";

import { useEffect, useState } from "react";

export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      // Clipboard blocked: the address is still selectable text
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-4">
      <a href={`mailto:${email}`} className="link t-h3 select-all">
        {email}
      </a>
      <button type="button" onClick={copy} className="btn btn-secondary px-4 py-2 t-small" aria-live="polite">
        {copied ? "Copied ✓" : "Copy"}
      </button>
    </div>
  );
}
