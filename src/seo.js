import t from './content.js'
import { brand, extras, gases, img, mapsUrl, repairs, vehicles } from './config.js'

const abs = (path) => brand.siteUrl.replace(/\/$/, '') + path
const c = t.calc

// Schema.org: автосервис с каталогом услуг (цены из калькулятора) и FAQ — для поисковиков, карт и ИИ-ассистентов.
// aggregateRating не выводим, пока в src/reviews.js нет реальных отзывов.
export function jsonLd() {
  const bizId = abs('/#business')
  const offer = (name, price, description) => ({
    '@type': 'Offer',
    name,
    description,
    priceSpecification: { '@type': 'PriceSpecification', minPrice: price, priceCurrency: 'BYN' },
  })
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AutoRepair',
        '@id': bizId,
        name: brand.fullName,
        legalName: brand.owner,
        url: abs('/'),
        image: [abs(img('hero')), abs(img('workshop'))],
        telephone: brand.phone,
        email: brand.email,
        description: t.meta.description,
        priceRange: '25–500 BYN',
        currenciesAccepted: 'BYN',
        paymentAccepted: 'Наличные, банковская карта, безналичный расчёт',
        areaServed: [{ '@type': 'City', name: brand.city }, { '@type': 'AdministrativeArea', name: 'Слуцкий район' }],
        address: {
          '@type': 'PostalAddress',
          streetAddress: brand.street,
          postalCode: brand.postalCode,
          addressLocality: brand.city,
          addressRegion: brand.region,
          addressCountry: brand.country,
        },
        geo: { '@type': 'GeoCoordinates', latitude: brand.geo.lat, longitude: brand.geo.lng },
        hasMap: mapsUrl,
        openingHoursSpecification: brand.hours.map((h) => ({
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: h.days,
          opens: h.opens,
          closes: h.closes,
        })),
        amenityFeature: [{ '@type': 'LocationFeatureSpecification', name: 'Бесплатный кофе для клиентов', value: true }],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: t.services.title,
          itemListElement: [
            ...vehicles.map((v) => offer(`${c.refill} — ${c.vehicles[v.id]}`, v.refill, c.refillHint)),
            ...gases.map((g) => offer(`${c.summary.lines.gas} ${c.gas[g.id]}, 100 г`, +(g.perGram * 100).toFixed(2), c.gasHint[g.id])),
            ...extras.map((x) => offer(c.extras[x.id][0], x.price, c.extras[x.id][1])),
            ...repairs.map((x) => offer(c.repairs[x.id][0], x.price, c.repairs[x.id][1])),
          ],
        },
      },
      {
        '@type': 'FAQPage',
        '@id': abs('/#faq'),
        inLanguage: 'ru',
        mainEntity: t.faq.items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
      {
        '@type': 'WebPage',
        '@id': abs('/#webpage'),
        url: abs('/'),
        name: t.meta.title,
        description: t.meta.description,
        inLanguage: 'ru',
        about: { '@id': bizId },
      },
    ],
  }
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export function renderHead() {
  const { title, description } = t.meta
  const url = abs('/')
  const image = abs(img('hero'))
  const tags = [
    ['meta', { name: 'description', content: description }],
    ['meta', { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1' }],
    ['link', { rel: 'canonical', href: url }],
    ['meta', { name: 'geo.region', content: 'BY-MI' }],
    ['meta', { name: 'geo.placename', content: brand.city }],
    ['meta', { name: 'geo.position', content: `${brand.geo.lat};${brand.geo.lng}` }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: brand.name }],
    ['meta', { property: 'og:title', content: title }],
    ['meta', { property: 'og:description', content: description }],
    ['meta', { property: 'og:url', content: url }],
    ['meta', { property: 'og:image', content: image }],
    ['meta', { property: 'og:locale', content: t.locale }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
  ].map(([tag, attrs]) => `<${tag}${Object.entries(attrs).map(([k, v]) => ` ${k}="${esc(v)}"`).join('')}>`)
  return [
    `<title>${esc(title)}</title>`,
    ...tags,
    `<script type="application/ld+json">${JSON.stringify(jsonLd()).replace(/</g, '\\u003c')}</script>`,
  ].join('\n    ')
}

export function robotsTxt() {
  const aiBots = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'PerplexityBot', 'Google-Extended', 'YandexBot', 'Bingbot']
  return ['User-agent: *', 'Allow: /', '', ...aiBots.flatMap((b) => [`User-agent: ${b}`, 'Allow: /', '']), `Sitemap: ${abs('/sitemap.xml')}`, ''].join('\n')
}

export function sitemapXml() {
  const today = new Date().toISOString().slice(0, 10)
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${abs('/')}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>1.0</priority></url>
</urlset>
`
}

// llms.txt — краткое описание сайта в Markdown для языковых моделей (llmstxt.org)
export function llmsTxt() {
  return [
    `# ${brand.fullName}`,
    '',
    `> ${t.meta.description}`,
    '',
    `Car air-conditioning workshop in ${brand.city}, Belarus (${brand.owner}). Cars, trucks, buses, agricultural machinery; on-site service for companies. Site language: Russian.`,
    '',
    '## Услуги',
    '',
    ...t.services.items.map((s) => `- **${s.title}** — ${s.text}`),
    '',
    '## Цены (BYN, ориентир)',
    '',
    ...vehicles.map((v) => `- ${c.refill} — ${c.vehicles[v.id]}: ${v.refill} BYN + фреон`),
    ...gases.map((g) => `- ${c.gas[g.id]}: ${(g.perGram * 100).toFixed(0)} BYN / 100 г`),
    ...extras.map((x) => `- ${c.extras[x.id][0]}: ${x.price} BYN${x.freeWithRefill ? ' (бесплатно при заправке)' : ''}`),
    ...repairs.map((x) => `- ${c.repairs[x.id][0]}: от ${x.price} BYN`),
    '',
    '## Преимущества',
    '',
    ...t.why.items.map((i) => `- **${i.title}** — ${i.text}`),
    `- **${t.coffee.title}** — ${t.coffee.text}`,
    '',
    '## FAQ',
    '',
    ...t.faq.items.flatMap((f) => [`### ${f.q}`, '', f.a, '']),
    '## Контакты',
    '',
    `- Адрес: ${brand.street}, ${brand.postalCode} ${brand.city}, Беларусь (${mapsUrl})`,
    ...t.contact.hours.map((h) => `- ${h}`),
    `- Телефон: ${brand.phone}`,
    `- E-mail: ${brand.email}`,
    '',
  ].join('\n')
}
