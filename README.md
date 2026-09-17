# todo3d-catalog

Catálogo web de productos 3D de **ToDo3D** (Fabricación Aditiva y Prototipado).
Sitio estático hecho con [Astro](https://astro.build) y pensado para
**Cloudflare Pages**. Sin usuarios ni base de datos: los productos viven en el
repositorio.

> Referencia de marca, logos y paleta: [`docs/index.md`](docs/index.md).

## Desarrollo

```bash
npm install
npm run dev      # servidor local en http://localhost:4321
npm run build    # genera el sitio en dist/
npm run preview  # sirve dist/ localmente
```

Requiere Node 18.20+ / 20.3+ / 22+.

## Añadir un producto

1. Crea una carpeta en `src/content/products/<slug>/` (el `<slug>` será la URL).
2. Dentro, añade las fotos (`.jpg`, `.png`, `.webp`, `.avif`). Llama a una
   `cover.jpg` si quieres fijar la miniatura del listado.
3. Crea `index.md` con este formato:

```markdown
---
title: Lámpara de mesa
price: 150000
currency: BOB
tags: [iluminacion, hogar]
material: PLA
weight: "1.2 kg"
dimensions: "20 × 20 × 35 cm"
---

Descripción del producto. Este texto aparece en la ficha.
```

Todos los campos excepto `title` son opcionales. Haz `git push` y Cloudflare
Pages reconstruye el sitio.

**Quitar un producto:** borra su carpeta y haz push (o pon `draft: true` en el
frontmatter para ocultarlo sin borrarlo).

## Configuración

Edita [`src/data/site.ts`](src/data/site.ts) para el número de WhatsApp, la
moneda y el locale.

## Desplegar en Cloudflare Pages

1. Sube el repo a GitHub/GitLab.
2. En Cloudflare Pages: **Create project → Connect to Git**.
3. Configura el build:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Deploy. Cada push a la rama principal vuelve a publicar automáticamente.
