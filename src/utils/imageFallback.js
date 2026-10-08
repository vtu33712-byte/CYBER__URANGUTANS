/**
 * Image fallback helper & realistic sample assets
 */

export const FALLBACK_IMAGE_SVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450' viewBox='0 0 800 450'%3E%3Cdefs%3E%3ClinearGradient id='bg' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%230b0f19'/%3E%3Cstop offset='100%25' stop-color='%230f172a'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23bg)'/%3E%3Ccircle cx='400' cy='200' r='60' fill='none' stroke='%2338bdf8' stroke-width='2' stroke-dasharray='6 6'/%3E%3Cpath d='M380 200 L420 200 M400 180 L400 220' stroke='%2322d3ee' stroke-width='2' stroke-linecap='round'/%3E%3Ctext x='400' y='300' font-family='sans-serif' font-size='16' font-weight='bold' fill='%2394a3b8' text-anchor='middle'%3ECIVICFLOW EVIDENCE SCAN%3C/text%3E%3Ctext x='400' y='325' font-family='sans-serif' font-size='12' fill='%2364748b' text-anchor='middle'%3EGrievance Site Telemetry Verified%3C/text%3E%3C/svg%3E`;

export const handleImageError = (e, fallback = FALLBACK_IMAGE_SVG) => {
  if (e && e.currentTarget && e.currentTarget.src !== fallback) {
    e.currentTarget.onerror = null;
    e.currentTarget.src = fallback;
  }
};
