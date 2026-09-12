import type { ReactNode } from 'react';

/**
 * Inline brand SVG logos for the technologies in the stack — no external
 * assets, no network requests, sharp at any size. Concept items with no brand
 * mark (e.g. "Rate Limiting") fall back to a monogram in the Stack component.
 *
 * Each entry returns an SVG sized 100% to fill its tile container.
 */

const wrap = (children: ReactNode, viewBox = '0 0 24 24'): ReactNode => (
  <svg viewBox={viewBox} width="100%" height="100%" aria-hidden="true">{children}</svg>
);

export const techIcons: Record<string, ReactNode> = {
  react: wrap(
    <g fill="none" stroke="#61dafb" strokeWidth="1">
      <circle cx="12" cy="12" r="2" fill="#61dafb" stroke="none" />
      <g>
        <ellipse cx="12" cy="12" rx="10" ry="4.2" />
        <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" />
      </g>
    </g>,
  ),
  typescript: wrap(
    <g>
      <rect width="24" height="24" rx="3" fill="#3178c6" />
      <path fill="#fff" d="M13.2 11.7v-1.6H6.9v1.6h2.2V18h1.9v-6.3h2.2zM14.3 17.7c.5.3 1.2.5 2 .5 1.9 0 3-1 3-2.5 0-1.2-.7-1.8-2-2.3-1-.4-1.3-.6-1.3-1 0-.3.3-.6.9-.6.6 0 1.2.2 1.7.5l.5-1.4c-.5-.3-1.2-.4-2.1-.4-1.7 0-2.8 1-2.8 2.4 0 1.2.8 1.8 2.1 2.3.9.3 1.2.6 1.2 1s-.4.7-1 .7c-.7 0-1.4-.2-1.9-.5v1.3z" />
    </g>,
  ),
  javascript: wrap(
    <g>
      <rect width="24" height="24" rx="3" fill="#f7df1e" />
      <path fill="#111" d="M11.5 12.3c0-.9-.6-1.3-1.6-1.3-.8 0-1.4.4-1.4 1 0 .5.4.8 1.2 1.1l.4.1c.5.2.6.3.6.6 0 .3-.3.5-.7.5s-.7-.2-.9-.6l-1 .6c.3.7 1 1.1 1.9 1.1 1.1 0 1.9-.6 1.9-1.5 0-.9-.5-1.3-1.5-1.7l-.4-.2c-.5-.2-.6-.3-.6-.5s.2-.4.5-.4.5.1.7.5l1-.6c-.4-.5-.9-.7-1.6-.7zm-3.6 0h-1.2v3.4c0 .5-.2.7-.5.7-.4 0-.6-.3-.7-.6l-1 .6c.3.7.9 1.1 1.7 1.1 1 0 1.7-.5 1.7-1.7v-3.5z" />
    </g>,
  ),
  java: wrap(
    <g fill="none">
      <path d="M9.5 5.5c-2 1.5-1 2.8 0 3.8 1.3 1.2 1.6 2 .8 3.2" stroke="#e76f00" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M12 4.5c1.5 1.8-.5 3-1.5 4" stroke="#e76f00" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M7 14.5c3 1.2 8 1 11-.2M8 17c2.3 1 6 .9 8.2-.2M9.5 19.2c1.6.6 4.2.6 5.8 0" stroke="#5382a1" strokeWidth="1.1" strokeLinecap="round" />
    </g>,
  ),
  sql: wrap(
    <g fill="none" stroke="#e0a869" strokeWidth="1.2">
      <ellipse cx="12" cy="6" rx="6.5" ry="2.4" />
      <path d="M5.5 6v12c0 1.3 2.9 2.4 6.5 2.4s6.5-1.1 6.5-2.4V6" />
      <path d="M5.5 12c0 1.3 2.9 2.4 6.5 2.4s6.5-1.1 6.5-2.4" />
    </g>,
  ),
  node: wrap(
    <g>
      <path fill="#539e43" d="M12 2 3.5 7v10L12 22l8.5-5V7L12 2Zm0 2.3 6.5 3.8v7.8L12 19.7 5.5 15.9V8.1L12 4.3Z" />
      <path fill="#539e43" d="M12 8.2c-1.9 0-3.1.8-3.1 2 0 1.3 1 1.7 2.6 2 1.2.2 1.5.4 1.5.7 0 .3-.3.5-1 .5-.8 0-1.2-.2-1.3-.7h-1.4c.1 1.2 1 1.9 2.7 1.9 1.8 0 2.9-.8 2.9-2 0-1.4-1.1-1.7-2.7-2-1.1-.2-1.4-.3-1.4-.6 0-.3.3-.4.9-.4.6 0 .9.2 1 .6h1.4c-.1-1.1-1-1.5-2.6-1.5Z" />
    </g>,
  ),
  express: wrap(
    <text x="12" y="15.5" textAnchor="middle" fontFamily="monospace" fontSize="9" fontWeight="700" fill="#e8eaed">ex</text>,
  ),
  fastify: wrap(
    <path fill="#e8eaed" d="M2 11h16l-3-3h2l5 4-5 4h-2l3-3H2z" />,
  ),
  angular: wrap(
    <g>
      <path fill="#dd0031" d="M12 2 3 5.2l1.4 11.9L12 22l7.6-4.9L21 5.2 12 2Z" />
      <path fill="#c3002f" d="M12 2v20l7.6-4.9L21 5.2 12 2Z" />
      <path fill="#fff" d="M12 5.5 7.5 16h1.7l.9-2.3h3.8l.9 2.3h1.7L12 5.5Zm1.3 6.6h-2.6L12 8.9l1.3 3.2Z" />
    </g>,
  ),
  tailwind: wrap(
    <path fill="#38bdf8" d="M12 6c-2.7 0-4.3 1.3-5 4 1-1.3 2.2-1.8 3.5-1.5.7.2 1.3.8 1.9 1.4.9 1 2 2.1 4.3 2.1 2.7 0 4.3-1.3 5-4-1 1.3-2.2 1.8-3.5 1.5-.7-.2-1.3-.8-1.9-1.4C15.4 7.1 14.3 6 12 6Zm-5 6c-2.7 0-4.3 1.3-5 4 1-1.3 2.2-1.8 3.5-1.5.7.2 1.3.8 1.9 1.4.9 1 2 2.1 4.3 2.1 2.7 0 4.3-1.3 5-4-1 1.3-2.2 1.8-3.5 1.5-.7-.2-1.3-.8-1.9-1.4C10.4 13.1 9.3 12 7 12Z" />,
  ),
  redux: wrap(
    <g fill="#764abc">
      <circle cx="12" cy="12" r="10" opacity="0.15" />
      <path d="M15.6 14.5c.8-.1 1.4-.8 1.3-1.6-.1-.8-.8-1.4-1.6-1.3-.8.1-1.4.8-1.3 1.6 0 .3.1.5.3.7-.7 1.4-1.8 2.4-3.4 2.2-1.9-.2-2.6-1.8-2.4-3.4.5.1 1-.1 1.3-.6.4-.7.2-1.5-.5-1.9s-1.5-.2-1.9.5c-.2.4-.2.9 0 1.3-.9 1.8-.3 4 1.6 4.9 1.8.8 4 .3 5-1.5.2-.4.4-.8.5-1.2zm2.3-2.9c1.4 1.2 1.9 3 1.1 4.4-.9 1.6-3.3 2.1-5.6 1.6v-1.3c1.9.4 3.6 0 4.1-1 .3-.6 0-1.5-.6-2.1zM6.6 16c-1.6-.2-2.9-1.4-2.9-3 0-2 2.3-3.2 5.2-3.2h.4c.2-.5.7-.8 1.2-.8.7 0 1.3.6 1.3 1.3s-.6 1.3-1.3 1.3c-.5 0-1-.3-1.2-.8h-.5c-2 0-3.7.7-3.7 2 0 .8.8 1.4 1.9 1.6z" />
    </g>,
  ),
  vite: wrap(
    <g>
      <path fill="#bd34fe" d="M11.5 3 4 4.6l6.6 15.9c.2.4.7.4.9 0L20 4.6 12.6 3c-.4-.1-.8-.1-1.1 0Z" opacity="0.9" />
      <path fill="#ffd028" d="M15.5 6.2 12 6.9l-.2 3.9 2.1-.4-1 3.4 4.2-6.5-2.6.5.9-1.5c.1-.2 0-.5-.4-.6Z" />
    </g>,
  ),
  postgres: wrap(
    <g fill="none" stroke="#336791" strokeWidth="1.1">
      <path d="M6 8c-1 4 .5 9 2 10 1 .6 2-.2 2.4-1.6M17 7.5c1.2 3.5.6 8-.4 9.7" />
      <path d="M8 5.5c2.5-1.2 6-1 8 .4" strokeLinecap="round" />
      <circle cx="9" cy="10" r="0.6" fill="#336791" stroke="none" />
      <path d="M12 9c1.5-.3 3 0 4 .7" strokeLinecap="round" />
    </g>,
  ),
  prisma: wrap(
    <path fill="#5a67d8" d="M20 17.5 12.8 2.6a1 1 0 0 0-1.7-.1L4.2 13.9a1 1 0 0 0 .2 1.3l7 5.5a1 1 0 0 0 1.5-.4l7-2.1a1 1 0 0 0 .1-.7ZM11.6 5.6l5.3 11-8.3-2.4 3-8.6Z" />,
  ),
  drizzle: wrap(
    <g fill="#c5f74f">
      <rect x="4" y="6" width="2" height="7" rx="1" transform="rotate(-20 5 9.5)" />
      <rect x="9" y="6" width="2" height="7" rx="1" transform="rotate(-20 10 9.5)" />
      <rect x="14" y="6" width="2" height="7" rx="1" transform="rotate(-20 15 9.5)" />
      <rect x="7" y="13" width="2" height="7" rx="1" transform="rotate(-20 8 16.5)" />
      <rect x="12" y="13" width="2" height="7" rx="1" transform="rotate(-20 13 16.5)" />
    </g>,
  ),
  neon: wrap(
    <g>
      <rect width="24" height="24" rx="5" fill="#00e599" opacity="0.15" />
      <path fill="#00e599" d="M6 7h9c1.7 0 3 1.3 3 3v7h-3v-6a1 1 0 0 0-1-1H9v7H6z" />
    </g>,
  ),
  docker: wrap(
    <g fill="#2496ed">
      <rect x="3" y="10" width="2.6" height="2.6" /><rect x="6" y="10" width="2.6" height="2.6" /><rect x="9" y="10" width="2.6" height="2.6" /><rect x="12" y="10" width="2.6" height="2.6" /><rect x="6" y="7" width="2.6" height="2.6" /><rect x="9" y="7" width="2.6" height="2.6" /><rect x="9" y="4" width="2.6" height="2.6" />
      <path d="M20 10c-.4-.8-1.3-1.2-1.6-1.3-.4.7-.4 1.6 0 2.2-.5.3-1 .3-2.4.3H2.5c-.1 1.7.4 3.5 1.6 4.8C5.6 17.5 8 18 11 18c4.6 0 8.5-2 10.3-6.4.9.1 2-.2 2.6-1.2-.7-.4-1.6-.4-2.3-.1-.3-.3-.9-.3-1.6-.3z" />
    </g>,
  ),
  git: wrap(
    <path fill="#f05133" d="M21.6 11.1 12.9 2.4a1.3 1.3 0 0 0-1.9 0L9.2 4.2l2.3 2.3a1.6 1.6 0 0 1 2 2l2.2 2.2a1.6 1.6 0 1 1-1 .9L12.7 9.5v5.4a1.6 1.6 0 1 1-1.3 0V9.4a1.6 1.6 0 0 1-.9-2.1L8.3 5.1l-6 6a1.3 1.3 0 0 0 0 1.9l8.7 8.7a1.3 1.3 0 0 0 1.9 0l8.7-8.7a1.3 1.3 0 0 0 0-1.9Z" />,
  ),
  github: wrap(
    <path fill="#e8eaed" d="M12 1.5A10.5 10.5 0 0 0 8.7 22c.5.1.7-.2.7-.5v-2c-2.9.6-3.5-1.4-3.5-1.4-.5-1.2-1.2-1.5-1.2-1.5-.9-.7.1-.6.1-.6 1 .1 1.6 1.1 1.6 1.1.9 1.6 2.5 1.1 3.1.9.1-.7.4-1.1.6-1.4-2.3-.3-4.8-1.2-4.8-5.2 0-1.1.4-2.1 1.1-2.8-.1-.3-.5-1.4.1-2.8 0 0 .9-.3 2.9 1.1a10 10 0 0 1 5.2 0c2-1.4 2.9-1.1 2.9-1.1.6 1.4.2 2.5.1 2.8.7.7 1.1 1.7 1.1 2.8 0 4-2.5 4.9-4.8 5.2.4.3.7 1 .7 1.9v2.8c0 .3.2.6.7.5A10.5 10.5 0 0 0 12 1.5Z" />,
  ),
  eslint: wrap(
    <g fill="none">
      <path d="M12 5 5 9v6l7 4 7-4V9l-7-4Z" stroke="#4b32c3" strokeWidth="1.1" />
      <path fill="#8080f2" d="m12 8 3.5 2v4L12 16l-3.5-2v-4L12 8Z" opacity="0.8" />
    </g>,
  ),
  prettier: wrap(
    <g fill="none" stroke="#f7b93e" strokeWidth="1.4" strokeLinecap="round">
      <path d="M5 7h10M5 10h6M13 10h4M5 13h4M11 13h6M5 16h12" stroke="#56b3b4" />
    </g>,
  ),
  stripe: wrap(
    <g>
      <rect width="24" height="24" rx="4" fill="#635bff" />
      <path fill="#fff" d="M11.6 9.7c0-.5.4-.7 1-.7.9 0 2 .3 2.9.8V7.3c-1-.4-2-.5-2.9-.5-2.4 0-4 1.2-4 3.3 0 3.2 4.4 2.7 4.4 4.1 0 .5-.5.7-1.1.7-1 0-2.2-.4-3.2-.9v2.4c1.1.5 2.2.7 3.2.7 2.4 0 4.1-1.2 4.1-3.3 0-3.5-4.4-2.9-4.4-4.1Z" />
    </g>,
  ),
  jest: wrap(
    <g>
      <path fill="#c21325" d="M12 2c-1 3 .5 5 0 7-2-1-3 1-2.5 2.5C7 12 5 14 6 17c1.2 3.5 5 4 7 3 2.5-1.2 4-4 3-7-.6-1.8-2-2.4-3.5-1.5.5-2-1-4.5-.5-9.5Z" opacity="0.9" />
      <circle cx="9" cy="9" r="1" fill="#fff" /><circle cx="15" cy="9" r="1" fill="#fff" />
    </g>,
  ),
  html5: wrap(
    <g>
      <path fill="#e34f26" d="M5 3l1.4 16L12 21l5.6-2L19 3H5Z" />
      <path fill="#ef652a" d="M12 4.5V19.5l4.5-1.5L17.6 4.5H12Z" />
      <path fill="#fff" d="M8 7h8l-.2 2H10l.1 1.8h5.5l-.5 5.2-3.1 1-3.1-1-.2-2h1.6l.1 1 1.6.5 1.6-.5.2-2H8.4L8 7Z" />
    </g>,
  ),
  css3: wrap(
    <g>
      <path fill="#1572b6" d="M5 3l1.4 16L12 21l5.6-2L19 3H5Z" />
      <path fill="#33a9dc" d="M12 4.5V19.5l4.5-1.5L17.6 4.5H12Z" />
      <path fill="#fff" d="M12 7v2h3.6l-.3 3.5-3.3 1v2l4.9-1.5.6-7H12Zm0 0H8l.2 2H12V7Z" />
    </g>,
  ),
  framer: wrap(
    <path fill="#e8eaed" d="M6 3h12v6h-6l6 6h-6v6l-6-6V9h6L6 3Z" />,
  ),
  zod: wrap(
    <g>
      <path fill="#3068b7" d="M4 4h16l-2.5 16H6.5L4 4Z" opacity="0.9" />
      <path fill="#fff" d="M8 8h8l-4.5 5H16l-.4 2.5H8l4.5-5H8.4L8 8Z" />
    </g>,
  ),
  recharts: wrap(
    <g fill="none" stroke="#22b5bf" strokeWidth="1.4" strokeLinecap="round">
      <path d="M4 19V5M4 19h16" />
      <path d="M7 15l3-4 3 2 4-6" stroke="#7c5cff" />
    </g>,
  ),
  jspdf: wrap(
    <g>
      <path fill="#e8353a" d="M6 3h8l4 4v14H6V3Z" opacity="0.9" />
      <path fill="#fff" d="M8 13h1.4c.9 0 1.4.5 1.4 1.3s-.5 1.3-1.4 1.3H8.7V17H8v-4Zm.7 2h.6c.4 0 .6-.2.6-.6s-.2-.6-.6-.6h-.6V15Z" />
    </g>,
  ),

  /* ---- Concept + brand icons for backend / security / payments / etc. ---- */
  // REST API — endpoints radiating from a hub.
  restapi: wrap(
    <g fill="none" stroke="#4da3ff" strokeWidth="1.3">
      <circle cx="12" cy="12" r="2.2" fill="#4da3ff" stroke="none" />
      <circle cx="5" cy="6" r="1.6" /><circle cx="19" cy="6" r="1.6" />
      <circle cx="5" cy="18" r="1.6" /><circle cx="19" cy="18" r="1.6" />
      <path d="M10.4 10.6 6.2 7.2M13.6 10.6l4.2-3.4M10.4 13.4l-4.2 3.4M13.6 13.4l4.2 3.4" strokeLinecap="round" />
    </g>,
  ),
  // JWT / token auth — a key.
  jwt: wrap(
    <g fill="none" stroke="#d63aff" strokeWidth="1.3" strokeLinecap="round">
      <circle cx="8" cy="8" r="3.2" />
      <path d="m10.2 10.2 8 8M15.5 15.5l2-2M17.5 17.5l1.8-1.8" />
    </g>,
  ),
  // RBAC / access control — a person inside a shield.
  rbac: wrap(
    <g fill="none" stroke="#a78bfa" strokeWidth="1.2">
      <path d="M12 3 5 5.5v5c0 4.2 3 7.5 7 9 4-1.5 7-4.8 7-9v-5L12 3Z" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="1.9" /><path d="M8.6 15.4a3.6 3.6 0 0 1 6.8 0" strokeLinecap="round" />
    </g>,
  ),
  // Generic security shield (Password Encryption, CAPTCHA, general).
  shield: wrap(
    <g fill="none" stroke="#7c5cff" strokeWidth="1.2">
      <path d="M12 3 5 5.5v5c0 4.2 3 7.5 7 9 4-1.5 7-4.8 7-9v-5L12 3Z" strokeLinejoin="round" />
      <path d="m9 11.5 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </g>,
  ),
  // Padlock (Password Encryption).
  lock: wrap(
    <g fill="none" stroke="#38bdf8" strokeWidth="1.3">
      <rect x="5.5" y="10.5" width="13" height="9" rx="2" />
      <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" strokeLinecap="round" />
      <circle cx="12" cy="14.5" r="1.1" fill="#38bdf8" stroke="none" />
    </g>,
  ),
  // Rate limiting — a speed gauge.
  ratelimit: wrap(
    <g fill="none" stroke="#35e6a5" strokeWidth="1.3" strokeLinecap="round">
      <path d="M4 15a8 8 0 0 1 16 0" />
      <path d="M12 15l4-3" />
      <circle cx="12" cy="15" r="1" fill="#35e6a5" stroke="none" />
    </g>,
  ),
  // Error handling / validation — a checklist check.
  validation: wrap(
    <g fill="none" stroke="#35e6a5" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="4" width="14" height="16" rx="2" stroke="#7c8695" />
      <path d="m8.5 10 1.5 1.5 3-3" />
      <path d="M8.5 15h7" stroke="#7c8695" />
    </g>,
  ),
  // Centralized error handling — warning triangle.
  errorhandling: wrap(
    <g fill="none" stroke="#f7b93e" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 4 3 19h18L12 4Z" />
      <path d="M12 10v4" /><circle cx="12" cy="16.5" r="0.6" fill="#f7b93e" stroke="none" />
    </g>,
  ),
  // Helmet (helmet.js security headers) — a hard hat.
  helmet: wrap(
    <g fill="none" stroke="#0a7e07" strokeWidth="1.3">
      <path d="M4 15a8 8 0 0 1 16 0" strokeLinecap="round" />
      <path d="M14 8.2A8 8 0 0 1 20 15" strokeLinecap="round" />
      <path d="M3 15h18v1.5a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 16.5V15Z" />
    </g>,
  ),
  // CAPTCHA — a checkbox "I'm not a robot".
  captcha: wrap(
    <g fill="none" stroke="#4da3ff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="5" width="14" height="14" rx="2.5" />
      <path d="m8.5 12 2.2 2.2L15.5 9" />
    </g>,
  ),
  // Swagger / OpenAPI — the brand green ring.
  swagger: wrap(
    <g>
      <circle cx="12" cy="12" r="9.2" fill="#85ea2d" />
      <path fill="#173647" d="M8.6 9.2c0-.7 0-1 .8-1v-1c-1.6 0-2 .6-2 2 0 .9 0 1.3-.9 1.3v1c.9 0 .9.4.9 1.3 0 1.4.4 2 2 2v-1c-.8 0-.8-.3-.8-1 0-.9-.1-1.4-.7-1.8.6-.4.7-.9.7-1.8Zm6.8 0c0-.7 0-1-.8-1v-1c1.6 0 2 .6 2 2 0 .9 0 1.3.9 1.3v1c-.9 0-.9.4-.9 1.3 0 1.4-.4 2-2 2v-1c.8 0 .8-.3.8-1 0-.9.1-1.4.7-1.8-.6-.4-.7-.9-.7-1.8ZM12 11.1a.9.9 0 1 0 0 1.8.9.9 0 0 0 0-1.8Zm-2.6 0a.9.9 0 1 0 0 1.8.9.9 0 0 0 0-1.8Zm5.2 0a.9.9 0 1 0 0 1.8.9.9 0 0 0 0-1.8Z" />
    </g>,
  ),
  // Leaflet — the brand leaf.
  leaflet: wrap(
    <path fill="#199900" d="M18 4c-6 0-11 4.5-12 11-.2 1.3-.2 2.6 0 4 .4-1 .9-1.9 1.5-2.7C10 14.7 13.5 12 18 11c-3.5 1.7-6 4.3-7.5 7.6-.3.7-.6 1.5-.8 2.4 1.2.3 2.4.3 3.5 0C17.7 19.7 20 14 20 8c0-1.4-.1-2.8-.4-4H18Z" />,
  ),
  // QR code.
  qrcode: wrap(
    <g fill="#e8eaed">
      <path d="M4 4h6v6H4V4Zm2 2v2h2V6H6Z" /><path d="M14 4h6v6h-6V4Zm2 2v2h2V6h-2Z" /><path d="M4 14h6v6H4v-6Zm2 2v2h2v-2H6Z" />
      <rect x="14" y="14" width="2" height="2" /><rect x="18" y="14" width="2" height="2" /><rect x="16" y="16" width="2" height="2" /><rect x="14" y="18" width="2" height="2" /><rect x="18" y="18" width="2" height="2" />
    </g>,
  ),
  // Subscription billing — a recurring-payment card.
  billing: wrap(
    <g fill="none" stroke="#635bff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3.5" y="6" width="17" height="12" rx="2" />
      <path d="M3.5 10h17" />
      <path d="M15 14.5a2.2 2.2 0 1 1-.6-1.5m.6-1v1.5h-1.5" />
    </g>,
  ),
  // Supertest — a request-arrow through a check (API test).
  supertest: wrap(
    <g fill="none" stroke="#22b5bf" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="8.5" stroke="#7c8695" />
      <path d="m8.5 12 2.2 2.2L16 9" />
    </g>,
  ),
  // Husky — a dog / git hook.
  husky: wrap(
    <g fill="#e8eaed">
      <path d="M6 5 8 9c1.2-.6 2.5-1 4-1s2.8.4 4 1l2-4-2.5 1L12 4 8.5 6 6 5Z" />
      <path d="M6 10c-.6 1.2-1 2.6-1 4 0 3.9 3.1 6 7 6s7-2.1 7-6c0-1.4-.4-2.8-1-4-1.5-1-3.5-1.6-6-1.6S7.5 9 6 10Zm3.5 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm5 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm-2.5 3 1.2 1H10.8l1.2-1Z" />
    </g>,
  ),
  // lint-staged — staged files with a check.
  lintstaged: wrap(
    <g fill="none" stroke="#f7b93e" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 4h8l4 4v12H6V4Z" stroke="#7c8695" />
      <path d="m8.5 13 1.6 1.6L14 11" />
    </g>,
  ),
  // Winston logger — a scroll / log lines.
  winston: wrap(
    <g fill="none" stroke="#35e6a5" strokeWidth="1.3" strokeLinecap="round">
      <rect x="4.5" y="4.5" width="15" height="15" rx="2" stroke="#7c8695" />
      <path d="M7.5 9h6M7.5 12h9M7.5 15h5" />
    </g>,
  ),
};

// Map a skill item name to an icon key.
export function iconKeyFor(name: string): string | null {
  const n = name.toLowerCase();
  if (n.startsWith('react router')) return 'react';
  if (n.startsWith('react hook')) return 'react';
  if (n.startsWith('react')) return 'react';
  if (n.startsWith('typescript')) return 'typescript';
  if (n.startsWith('javascript')) return 'javascript';
  if (n === 'java') return 'java';
  if (n === 'sql') return 'sql';
  if (n.startsWith('node')) return 'node';
  if (n.startsWith('express')) return 'express';
  if (n.startsWith('fastify')) return 'fastify';
  if (n.startsWith('angular')) return 'angular';
  if (n.startsWith('tailwind')) return 'tailwind';
  if (n.startsWith('redux')) return 'redux';
  if (n.startsWith('vite')) return 'vite';
  if (n.startsWith('postgres')) return 'postgres';
  if (n.startsWith('prisma')) return 'prisma';
  if (n.startsWith('drizzle')) return 'drizzle';
  if (n.startsWith('neon')) return 'neon';
  if (n.startsWith('docker')) return 'docker';
  if (n === 'git') return 'git';
  if (n.startsWith('github')) return 'github';
  if (n.startsWith('eslint')) return 'eslint';
  if (n.startsWith('prettier')) return 'prettier';
  if (n.startsWith('stripe')) return 'stripe';
  if (n.startsWith('subscription')) return 'billing';
  if (n.startsWith('jest')) return 'jest';
  if (n.startsWith('supertest')) return 'supertest';
  if (n.startsWith('html')) return 'html5';
  if (n.startsWith('css')) return 'css3';
  if (n.startsWith('framer')) return 'framer';
  if (n === 'zod') return 'zod';
  if (n.startsWith('recharts')) return 'recharts';
  if (n.startsWith('jspdf')) return 'jspdf';

  // Frontend concepts / brands without a prior mapping.
  if (n.startsWith('leaflet')) return 'leaflet';
  if (n.startsWith('qr')) return 'qrcode';

  // Backend concepts.
  if (n.startsWith('rest')) return 'restapi';
  if (n.includes('refresh') || n.startsWith('jwt')) return 'jwt';
  if (n.includes('role-based') || n === 'rbac') return 'rbac';
  if (n.includes('error handling')) return 'errorhandling';
  if (n.includes('request validation') || n.includes('validation')) return 'validation';
  if (n.includes('swagger') || n.includes('openapi')) return 'swagger';

  // Security concepts.
  if (n.includes('password') || n.includes('encryption')) return 'lock';
  if (n.includes('captcha')) return 'captcha';
  if (n.startsWith('helmet')) return 'helmet';
  if (n.includes('rate limit')) return 'ratelimit';

  // Dev tools.
  if (n.startsWith('husky')) return 'husky';
  if (n.startsWith('lint-staged') || n.includes('lint-staged')) return 'lintstaged';
  if (n.startsWith('winston')) return 'winston';

  return null;
}
