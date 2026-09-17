import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Colección de productos: una carpeta por producto en src/content/products/<slug>/index.md
// Las imágenes (.jpg/.png/.webp/.avif) van en esa misma carpeta.
const products = defineCollection({
  loader: glob({
    pattern: '**/index.md',
    base: './src/content/products',
    // El id (slug) es el nombre de la carpeta, sin "/index.md".
    generateId: ({ entry }) => entry.replace(/\/index\.md$/i, ''),
  }),
  schema: z.object({
    title: z.string(),
    // Precio en número (sin símbolos). Opcional: puedes omitirlo.
    price: z.number().optional(),
    // Si no defines currency, se usa la de src/data/site.ts
    currency: z.string().optional(),
    // Tags para filtrar en el listado.
    tags: z.array(z.string()).default([]),
    // Ficha técnica (todos opcionales).
    material: z.string().optional(),
    weight: z.string().optional(),
    dimensions: z.string().optional(),
    // Orden opcional: número más bajo aparece primero. Por defecto se ordena por título.
    order: z.number().optional(),
    // Marca un producto como oculto sin borrarlo.
    draft: z.boolean().default(false),
  }),
});

export const collections = { products };
