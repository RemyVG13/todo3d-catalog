import { getCollection, type CollectionEntry } from 'astro:content';
import type { ImageMetadata } from 'astro';
import { site } from '../data/site';

export type Product = CollectionEntry<'products'>;
export type ProductVariant = Product['data']['variants'][number];
export type ImageFit = 'contain' | 'cover';
export type CatalogImage = {
  src: ImageMetadata;
  filename: string;
};

// Todas las imágenes de todos los productos, resueltas en build.
const imageModules = import.meta.glob<{ default: ImageMetadata }>(
  '/src/content/products/**/*.{jpg,jpeg,png,webp,avif}',
  { eager: true }
);

const imagesBySlug = new Map<string, CatalogImage[]>();

for (const [path, mod] of Object.entries(imageModules)) {
  const match = path.match(/\/products\/([^/]+)\/([^/]+)$/);
  if (!match) continue;
  const slug = match[1];
  const filename = match[2];
  const list = imagesBySlug.get(slug) ?? [];
  list.push({ src: mod.default, filename });
  imagesBySlug.set(slug, list);
}

function sortImages(images: CatalogImage[]): CatalogImage[] {
  return [...images].sort((a, b) => {
    const aCover = /^cover\./i.test(a.filename) ? 0 : 1;
    const bCover = /^cover\./i.test(b.filename) ? 0 : 1;
    if (aCover !== bCover) return aCover - bCover;
    return a.filename.localeCompare(b.filename);
  });
}

export function getProductImages(slug: string): CatalogImage[] {
  return sortImages(imagesBySlug.get(slug) ?? []);
}

export function getCoverImage(slug: string): CatalogImage | undefined {
  return getProductImages(slug)[0];
}

export function resolveImageDisplay(
  product: Product,
  filename: string
): { fit: ImageFit; position: string } {
  const overrides = product.data.imageAdjust;
  const key = Object.keys(overrides).find(
    (name) => name.toLowerCase() === filename.toLowerCase()
  );
  const override = key ? overrides[key] : undefined;
  return {
    fit: override?.fit ?? product.data.imageFit,
    position: override?.position ?? product.data.imagePosition,
  };
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

// Precios vigentes: las variantes ganan si existen; si no, el `price` único.
export function getOfferPrices(product: Product): number[] {
  if (product.data.variants.length > 0) {
    return product.data.variants.map((v) => v.price);
  }
  return product.data.price != null ? [product.data.price] : [];
}

// En el listado: "Desde Bs 20" si hay más de un precio; si no, el precio único.
export function formatProductPrice(product: Product): string | null {
  const prices = getOfferPrices(product);
  if (prices.length === 0) return null;
  const min = Math.min(...prices);
  const formatted = formatPrice(min, product.data.currency);
  if (!formatted) return null;
  const hasRange = prices.some((p) => p !== min);
  return hasRange ? `Desde ${formatted}` : formatted;
}
