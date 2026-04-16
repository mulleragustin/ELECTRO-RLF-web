import { SITE } from "./site";

const HOME_IMAGE = `${SITE.baseUrl}/assets/seo/ferreteria-electrica-resistencia-electro-rlf.jpg`;
const ABOUT_IMAGE = `${SITE.baseUrl}/assets/seo/negocio-electro-rlf-resistencia-chaco.jpg`;
const SHOP_IMAGE = `${SITE.baseUrl}/assets/seo/kit-herramientas-insumos-electricos-electro-rlf.jpg`;
const OG_IMAGE = `${SITE.baseUrl}/assets/seo/electro-rlf-ferreteria-electrica-resistencia-og.jpg`;

const ROUTE_SEO = {
  "/": {
    title: "Ferretería eléctrica en Resistencia | ELECTRO RLF",
    description:
      "Venta de materiales, eléctricicidad, armado de tableros, todo lo que necesitas para tu hogar o tu obra. Coordiná por WhatsApp, retirá por el local mas cercano en Resistencia, Chaco.",
    canonicalPath: "/",
    image: HOME_IMAGE,
    ogImage: OG_IMAGE,
    imageWidth: "1200",
    imageHeight: "630",
    imageAlt: "Ferretería eléctrica Electro RLF en Resistencia, Chaco",
  },
  "/nosotros": {
    title:
      "Sobre ELECTRO RLF | Materiales, eléctricicidad y todo lo que necestas para tu obra u hogar en Resistencia",
    description:
      "Conocé ELECTRO RLF: atención personalizada, herramientas y materiales certificados; en el centro de Resistencia, Chaco.",
    canonicalPath: "/nosotros",
    image: ABOUT_IMAGE,
    ogImage: OG_IMAGE,
    imageWidth: "1200",
    imageHeight: "630",
    imageAlt: "Negocio Electro RLF con atención personalizada en Resistencia",
  },
  "/shop": {
    title: "Shop Electro RLF próximamente | Compras por WhatsApp en Resistencia",
    description:
      "El shop online de ELECTRO RLF está en preparación. Coordiná tu compra por WhatsApp y retirala en Hipólito Yrigoyen 715 o Juan Ramón Lestani 649.",
    canonicalPath: "/shop",
    image: SHOP_IMAGE,
    ogImage: OG_IMAGE,
    imageWidth: "1200",
    imageHeight: "630",
    imageAlt: "Kits e insumos eléctricos de Electro RLF para comprar en Resistencia",
  },
};

function absoluteUrl(path) {
  return new URL(path, SITE.baseUrl).toString();
}

function ensureMeta(attributeName, attributeValue, content) {
  let tag = document.head.querySelector(`meta[${attributeName}="${attributeValue}"]`);

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attributeName, attributeValue);
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", content);
}

function ensureCanonical(href) {
  let tag = document.head.querySelector('link[rel="canonical"]');

  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", "canonical");
    document.head.appendChild(tag);
  }

  tag.setAttribute("href", href);
}

export function getRouteSeo(pathname) {
  return ROUTE_SEO[pathname] ?? ROUTE_SEO["/"];
}

export function applyRouteSeo(pathname) {
  const seo = getRouteSeo(pathname);
  const canonicalUrl = absoluteUrl(seo.canonicalPath);
  const socialImage = seo.ogImage ?? seo.image;

  document.title = seo.title;
  ensureCanonical(canonicalUrl);

  ensureMeta("name", "description", seo.description);
  ensureMeta("name", "robots", "index, follow, max-image-preview:large");
  ensureMeta("property", "og:title", seo.title);
  ensureMeta("property", "og:description", seo.description);
  ensureMeta("property", "og:type", "website");
  ensureMeta("property", "og:url", canonicalUrl);
  ensureMeta("property", "og:site_name", SITE.name);
  ensureMeta("property", "og:locale", "es_AR");
  ensureMeta("property", "og:image", socialImage);
  ensureMeta("property", "og:image:secure_url", socialImage);
  ensureMeta("property", "og:image:width", seo.imageWidth);
  ensureMeta("property", "og:image:height", seo.imageHeight);
  ensureMeta("property", "og:image:alt", seo.imageAlt);
  ensureMeta("name", "twitter:card", "summary_large_image");
  ensureMeta("name", "twitter:title", seo.title);
  ensureMeta("name", "twitter:description", seo.description);
  ensureMeta("name", "twitter:image", socialImage);
  ensureMeta("name", "twitter:image:alt", seo.imageAlt);
}
