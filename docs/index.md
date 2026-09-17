# ToDo3D — Estado del arte (marca y catálogo)

Documento de referencia para no perder decisiones de marca y estructura. No es
una página del sitio; es documentación interna del repo.

## Empresa

- **Nombre:** ToDo3D
- **Tagline / leyenda:** Fabricación Aditiva y Prototipado
- **Producto:** catálogo web estático (sin usuarios, sin base de datos) para
  mostrar productos de impresión 3D.
- **Hosting:** Cloudflare Pages (build de Astro, salida `dist/`).

## Logos

Los logos están en [`../logos/`](../logos/) en PNG con transparencia.

> IMPORTANTE: los logos están pensados para usarse sobre **fondo blanco**
> (`#FEFEFE`). No colocarlos sobre teal, charcoal ni fotos oscuras. Por eso el
> header, el footer y el chrome del sitio se mantienen claros; el teal y el
> charcoal se usan en textos, acentos y botones, nunca de fondo detrás del logo.

| Archivo | Qué contiene | Dónde se usa |
|---|---|---|
| `logos/full_logo_nobackground.png` | Icono + "ToDo3D" + leyenda debajo | Header en escritorio (≥640px) |
| `logos/isologo_nobackground.png` | Icono + "ToDo3D" centrado (sin leyenda) | Header compacto en móvil (<640px) |
| `logos/isotipo_nobackground.png` | Solo el cubo (icono) | Favicon / icono pequeño |

No es obligatorio usar los tres en cada pantalla.

## Paleta de colores

Fuente de verdad: [`../colorpalette.css`](../colorpalette.css). Reflejada como
tokens CSS en [`../src/styles/global.css`](../src/styles/global.css).

| Token | HEX | HSL | Uso |
|---|---|---|---|
| tropical-teal | `#37AAAE` | `hsl(182, 52%, 45%)` | Acento, botones, enlaces |
| white | `#FEFEFE` | `hsl(0, 0%, 100%)` | Fondo del sitio y de los logos |
| charcoal-blue | `#3A444D` | `hsl(208, 14%, 26%)` | Texto principal |
| cool-steel | `#9DA2A6` | `hsl(207, 5%, 63%)` | Texto secundario / bordes |

## Estructura del catálogo

- Un producto = una carpeta en `src/content/products/<slug>/`.
  - `index.md` con los datos (frontmatter) y la descripción (cuerpo).
  - Las fotos (`.jpg/.png/.webp/.avif`) en esa misma carpeta.
  - `cover.*` (opcional) se usa como miniatura; si no existe, se toma la primera
    foto en orden alfabético.
- El **slug** (URL `/producto/<slug>/`) es el nombre de la carpeta.
- Para **quitar** un producto: borra su carpeta y haz push.

### Campos del frontmatter

```yaml
title: Nombre del producto      # obligatorio
price: 150000                   # opcional (número, sin símbolos)
currency: COP                   # opcional (por defecto, la de src/data/site.ts)
tags: [iluminacion, hogar]      # opcional (para filtrar por categoría)
material: PLA                   # opcional
weight: "1.2 kg"               # opcional
dimensions: "20 × 20 × 35 cm"  # opcional
order: 1                        # opcional (menor = aparece primero)
draft: false                    # opcional (true lo oculta sin borrarlo)
```

## Configuración global

[`../src/data/site.ts`](../src/data/site.ts): nombre, tagline, número de
WhatsApp, moneda y locale. Es el único archivo a tocar para esos datos.

## Responsive

Diseño mobile-first. Verificar en ~375px (móvil) y ~1280px (escritorio):
header/logo legible sobre blanco, filtros por tags, grid de productos, galería
y botón de WhatsApp.
