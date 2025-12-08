'use client';

import DOMPurify from 'dompurify';
import { useEffect, useState } from 'react';

interface SanitizedHTMLProps {
  html: string;
  className?: string;
}

export default function SanitizedHTML({ html, className }: SanitizedHTMLProps) {
  const [sanitizedHTML, setSanitizedHTML] = useState('');

  useEffect(() => {
    // Sanitize HTML on the client side only (DOMPurify requires DOM)
    const clean = DOMPurify.sanitize(html, {
      ALLOWED_TAGS: [
        'p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'ul', 'ol', 'li', 'a', 'div', 'span', 'img', 'blockquote', 'code', 'pre',
        'table', 'thead', 'tbody', 'tr', 'td', 'th', 'svg', 'path', 'time'
      ],
      ALLOWED_ATTR: [
        'href', 'target', 'rel', 'class', 'id', 'src', 'alt', 'title',
        'width', 'height', 'style', 'datetime', 'fill', 'stroke', 'viewBox',
        'stroke-linecap', 'stroke-linejoin', 'stroke-width', 'd'
      ],
      ALLOW_DATA_ATTR: false,
    });
    setSanitizedHTML(clean);
  }, [html]);

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
    />
  );
}
