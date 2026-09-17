import { getCollection, type CollectionEntry } from 'astro:content';
import type { ImageMetadata } from 'astro';
import { site } from '../data/site';

export type Product = CollectionEntry<'products'>;

// Todas las imágenes de todos los productos, resueltas en build.
// La clave es la ruta del archivo; el valor es el ImageMetadata (para <Image />).
const imageModules = import.meta.glob<{ default: ImageMetadata }>(
  '/src/content/products/**/*.{jpg,jpeg,png,webp,avif}',
  { eager: true }
);

// slug del producto -> lista de imágenes ordenadas (cover.* primero).
const imagesBySlug = new Map<string, ImageMetadata[]>();

for (const [path, mod] of Object.entries(imageModules)) {
  const match = path.match(/\/products\/([^/]+)\//);
  if (!match) continue;
  const slug = match[1];
  const list = imagesBySlug.get(slug) ?? [];
  list.push(mod.default);
  imagesBySlug.set(slug, list);
}

// Ordena poniendo cualquier archivo llamado "cover" primero, luego alfabético.
function sortImages(images: ImageMetadata[]): ImageMetadata[] {
  return [...images].sort((a, b) => {
    const aCover = /\/cover\.[a-z]+$/i.test(a.src) ? 0 : 1;
    const bCover = /\/cover\.[a-z]+$/i.test(b.src) ? 0 : 1;
    if (aCover !== bCover) return aCover - bCover;
    return a.src.localeCompare(b.src);
  });
}

export function getProductImages(slug: string): ImageMetadata[] {
  return sortImages(imagesBySlug.get(slug) ?? []);
}

export function getCoverImage(slug: string): ImageMetadata | undefined {
  return getProductImages(slug)[0];
}

// Productos visibles (excluye draft), ordenados por `order` y luego por título.
export async function getProducts(): Promise<Product[]> {
  const all = await getCollection('products', ({ data }) => !data.draft);
  return all.sort((a, b) => {
    const ao = a.data.order ?? Number.POSITIVE_INFINITY;
    const bo = b.data.order ?? Number.POSITIVE_INFINITY;
    if (ao !== bo) return ao - bo;
    return a.data.title.localeCompare(b.data.title, site.locale);
  });
}

// Lista única de tags presentes en los productos visibles, ordenada.
export function collectTags(products: Product[]): string[] {
  const set = new Set<string>();
  for (const p of products) for (const t of p.data.tags) set.add(t);
  return [...set].sort((a, b) => a.localeCompare(b, site.locale));
}

// Formatea el precio según la moneda del producto o la global.
export function formatPrice(
  price?: number,
  currency?: string
): string | null {
  if (price == null) return null;
  const cur = currency ?? site.currency;
  try {
    return new Intl.NumberFormat(site.locale, {
      style: 'currency',
      currency: cur,
      maximumFractionDigits: 0,
    }).format(price);
  } catch {
    return `${price} ${cur}`;
  }
}
