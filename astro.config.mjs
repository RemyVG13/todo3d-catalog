// @ts-check
import { defineConfig } from 'astro/config';

// Sitio estático para Cloudflare Pages (sin adaptador ni Functions).
export default defineConfig({
  // Si publicas en un dominio propio, pon aquí la URL final (mejora SEO/canonical).
  // site: 'https://todo3d.pages.dev',
  output: 'static',
});
