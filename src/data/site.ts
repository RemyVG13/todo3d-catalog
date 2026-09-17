// Configuración global del sitio. Edita aquí los datos de la empresa.
// Es el único lugar que necesitas tocar para cambiar WhatsApp, nombre o textos.

export const site = {
  name: 'ToDo3D',
  tagline: 'Fabricación Aditiva y Prototipado',
  // Descripción para SEO / meta.
  description:
    'Catálogo de productos de impresión 3D de ToDo3D: piezas, prototipos y fabricación aditiva a medida.',

  // Número de WhatsApp en formato internacional SIN "+", espacios ni guiones.
  // Ejemplo Colombia: 57 + número => '573001234567'. Déjalo vacío para ocultar el botón.
  whatsapp: '59161680104',

  // Moneda por defecto si un producto no define la suya (bolivianos).
  currency: 'BOB',
  // Locale para formatear precios (separadores de miles, etc.).
  locale: 'es-BO',

  socials: [
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/todo3d.bolivia/',
    },
    {
      name: 'TikTok',
      href: 'https://www.tiktok.com/@todo3d.bolivia',
    },
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/profile.php?id=61594487879300',
    },
  ],
} as const;

// Construye el enlace de WhatsApp con un mensaje pre-rellenado.
export function whatsappLink(productTitle?: string): string | null {
  if (!site.whatsapp) return null;
  const base = `https://wa.me/${site.whatsapp}`;
  const text = productTitle
    ? `Hola ${site.name}, me interesa el producto: ${productTitle}`
    : `Hola ${site.name}, quiero más información sobre sus productos`;
  return `${base}?text=${encodeURIComponent(text)}`;
}
