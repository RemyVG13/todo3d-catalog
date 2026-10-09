import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Colección de productos: una carpeta por producto en src/content/products/<slug>/index.md
// Las imágenes (.jpg/.png/.webp/.avif) van en esa misma carpeta.
const products = defineCollection({
  loader: glob({
    pattern: '*/index.md',
    base: './src/content/products',
    // El id (slug) es el nombre de la carpeta, sin "/index.md".
    generateId: ({ entry }) => entry.replace(/\/index\.md$/i, ''),
  }),
  schema: z.object({
    title: z.string(),
    // Precio único si el producto no tiene variantes.
    price: z.number().optional(),
    // Si no defines currency, se usa la de src/data/site.ts
    currency: z.string().optional(),
    // Opciones de impresión (unicolor / multicolor, etc.). Si existen, mandan sobre `price`.
    variants: z
      .array(
        z.object({
          name: z.string(),
          price: z.number(),
          note: z.string().optional(),
        })
      )
      .default([]),
    // Tags para filtrar en el listado.
    tags: z.array(z.string()).default([]),
    // Ficha técnica (todos opcionales).
    material: z.string().optional(),
    weight: z.string().optional(),
    dimensions: z.string().optional(),
    // Orden opcional: número más bajo aparece primero. Por defecto se ordena por título.
    order: z.number().optional(),
    // Cómo encajar las fotos en el recuadro 4:3.
    // contain = se ve entera (puede dejar bandas). cover = llena el recuadro (recorta).
    imageFit: z.enum(['contain', 'cover']).default('contain'),
    // Punto de anclaje si usas cover, o al centrar un contain. Ej: center, top, bottom, left, "50% 20%".
    imagePosition: z.string().default('center'),
    // Ajuste por archivo (nombre exacto, p. ej. "2.png"), pisa imageFit/imagePosition.
    imageAdjust: z
      .record(
        z.string(),
        z.object({
          fit: z.enum(['contain', 'cover']).optional(),
          position: z.string().optional(),
        })
      )
      .default({}),
    // Marca un producto como oculto sin borrarlo.
    draft: z.boolean().default(false),
    // La foto es de referencia: el cliente elige el color al pedir.
    colorChoice: z.boolean().default(true),
  }),
});

export const collections = { products };
