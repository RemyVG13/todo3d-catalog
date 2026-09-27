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
| `logos/full_logo_nobackground.png` | Icono + "ToDo3D" + leyenda debajo | Header en escritorio (≥640px), alineado a la izquierda |
| `logos/isologo_nobackground.png` | Icono + "ToDo3D" centrado (sin leyenda) | Header en móvil (<640px), centrado arriba |
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
price: 25                       # opcional si no hay variantes
currency: BOB                   # opcional (por defecto, bolivianos)
tags: [juguete]                 # opcional (para filtrar por categoría)
material: PLA                   # opcional
weight: "9 g"                   # opcional
dimensions: "60 × 30 × 30 mm"   # opcional
order: 1                        # opcional (menor = aparece primero)
imageFit: contain               # contain = foto entera (default). cover = recorta para llenar
imagePosition: center           # anclaje: center, top, bottom, left, right, "50% 20%"
imageAdjust:                    # opcional, por archivo
  2.png:
    fit: cover
    position: top
draft: false                    # opcional (true lo oculta sin borrarlo)
variants:                       # opcional; si existe, manda sobre `price`
  - name: Unicolor
    price: 20
    note: El color se confirma por WhatsApp
  - name: Multicolor
    price: 25
    note: Como en las fotos
```

Un producto = un modelo. Las variantes (unicolor / multicolor, etc.) viven en
el mismo `index.md`. En el listado se muestra “Desde …” si hay más de un
precio. Ejemplo: [`../src/content/products/bebe-dragon-8cm/index.md`](../src/content/products/bebe-dragon-8cm/index.md).

Las fotos se muestran **enteras** por defecto (`imageFit: contain`). Si una
queda con mucho espacio vacío y prefieres que llene el recuadro, usa
`imageFit: cover` y `imagePosition` (p. ej. `top` si recorta la cabeza).
`imageAdjust` sirve para una sola foto del producto.

## Configuración global

[`../src/data/site.ts`](../src/data/site.ts): nombre, tagline, número de
WhatsApp, redes sociales (Instagram, TikTok, Facebook), moneda (bolivianos,
`BOB`) y locale (`es-BO`). Es el único archivo a tocar para esos datos.

El listado combina una **barra de búsqueda** (título o tags) con los filtros
por categoría.

## Enlaces para QR o temáticas

Puedes abrir el catálogo ya filtrado con query params. Sirve para imprimir un
QR de “juguetes”, “plantas”, etc.

- Una categoría: `/?tags=juguete`
- Varias (OR: muestra productos que tengan cualquiera): `/?tags=juguete,plantas`
- Alias en español: `/?categorias=juguete`
- También puedes combinar búsqueda: `/?tags=juguete&q=dragon`

El nombre del tag debe coincidir con el del producto (`tags:` en el
`index.md`). No distingue mayúsculas ni acentos. Al tocar filtros en la
página, la URL se actualiza sola: cópiala o genera el QR con esa misma
dirección.

## Responsive

Diseño mobile-first. Verificar en ~375px (móvil) y ~1280px (escritorio):
header/logo legible sobre blanco, barra de búsqueda, filtros por tags, grid de
productos, galería y botón de WhatsApp.
