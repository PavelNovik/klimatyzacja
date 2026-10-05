// Общие настройки: контакты, цены калькулятора, фото. Тексты — в src/content.js
import photos from '../scripts/images.json'

// TODO: заменить заглушки (название, телефон, мессенджеры, e-mail, часы, УНП) реальными данными владельца
export const brand = {
  name: 'Климат-Сервис',
  fullName: 'Климат-Сервис — заправка и ремонт автокондиционеров в Слуцке',
  owner: 'ИП Вечер Сергей Леонидович',
  unp: '000000000', // TODO: УНП
  // Боевой адрес сайта — для canonical, sitemap и Schema.org (на Vercel подставляется домен проекта)
  siteUrl: __SITE_URL__ || 'https://klimat-sluck.by',
  phone: '+375 (33) 666-66-22',
  viber: '+375336666622',
  telegram: 'klimat_sluck', // TODO: ник Telegram без @
  email: 'info@klimat-sluck.by', // TODO
  street: 'ул. Гагарина', // TODO: уточнить дом
  postalCode: '223602',
  city: 'Слуцк',
  region: 'Минская область',
  country: 'BY',
  geo: { lat: 53.048352, lng: 27.585578 },
  hours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '19:00' },
    { days: ['Saturday'], opens: '09:00', closes: '15:00' },
  ],
}

// Точка на Google Картах, которую прислал владелец
export const mapsUrl = 'https://maps.app.goo.gl/rRvxr1NGwbYRbPy26'
export const mapEmbed = `https://www.google.com/maps?q=${brand.geo.lat},${brand.geo.lng}&z=16&hl=ru&output=embed`
export const reviewUrl = mapsUrl

export const phoneHref = `tel:${brand.phone.replace(/[^\d+]/g, '')}`

export const img = (name) => `/images/${name}.webp`
export const imgSm = (name) => `/images/${name}-sm.webp`
export const srcSet = (name) => `${imgSm(name)} ${Math.round(photos[name].width / 2)}w, ${img(name)} ${photos[name].width}w`

// Автор и ссылка на фото Unsplash — для подписи в футере
export const credits = Object.entries(photos).map(([name, p]) => ({ name, author: p.author, url: `https://unsplash.com/@${p.user}` }))

// ── Калькулятор. Все цены в BYN — ориентир по рынку Беларуси, 2026 ──

// Тип техники: работа по заправке, масса фреона по умолчанию и пределы ползунка (г),
// коэффициент для ремонтных работ (крупная техника — дольше и сложнее)
export const vehicles = [
  { id: 'car', refill: 45, grams: 550, min: 300, max: 1200, repair: 1 },
  { id: 'van', refill: 55, grams: 900, min: 500, max: 2000, repair: 1.15 },
  { id: 'truck', refill: 70, grams: 1100, min: 600, max: 2500, repair: 1.4 },
  { id: 'bus', refill: 110, grams: 4000, min: 1500, max: 9000, repair: 1.6 },
  { id: 'agro', refill: 70, grams: 1500, min: 800, max: 3500, repair: 1.4 },
]

// Цена фреона за грамм
export const gases = [
  { id: 'r134a', perGram: 0.09 },
  { id: 'r1234yf', perGram: 0.45 },
]

// Дополнительные услуги (фиксированная цена)
export const extras = [
  { id: 'diag', price: 25, freeWithRefill: true },
  { id: 'uv', price: 20 },
  { id: 'nitrogen', price: 25 },
  { id: 'oil', price: 12 },
  { id: 'dryer', price: 40 },
  { id: 'clean', price: 35 },
  { id: 'cabin', price: 15 },
]

// Ремонт — стоимость работы «от», умножается на коэффициент техники; запчасти отдельно
export const repairs = [
  { id: 'compressor', price: 120 },
  { id: 'condenser', price: 80 },
  { id: 'hoses', price: 50 },
  { id: 'evaporator', price: 160 },
]

export const onsite = {
  base: 30, // выезд в пределах Слуцка
  perKm: 1, // за каждый км за городом (туда и обратно)
  maxKm: 150,
}

export const range = { low: 0.92, high: 1.1 }
