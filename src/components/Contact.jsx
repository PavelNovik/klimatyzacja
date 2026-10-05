import t from '../content.js'
import { brand, mapEmbed, mapsUrl, phoneHref } from '../config.js'
import Icon from './Icon.jsx'
import SectionHead from './SectionHead.jsx'

export default function Contact() {
  const c = t.contact
  const info = [
    ['pin', c.address, <a href={mapsUrl} target="_blank" rel="noopener noreferrer">{brand.street}, {brand.city}, {brand.postalCode} <Icon name="arrowUpRight" size={14} /></a>],
    ['clock', c.hoursLabel, c.hours.map((h) => <span key={h} className="contact__line">{h}</span>)],
    ['phone', c.phone, <a href={phoneHref} className="mono">{brand.phone}</a>],
    [
      'viber',
      c.messengers,
      <span className="contact__msg">
        <a href={`viber://chat?number=${encodeURIComponent(brand.viber)}`}>Viber</a>
        <a href={`https://t.me/${brand.telegram}`} target="_blank" rel="noopener noreferrer">Telegram</a>
      </span>,
    ],
    ['mail', c.email, <a href={`mailto:${brand.email}`}>{brand.email}</a>],
  ]

  return (
    <section className="section contact" id="contact" aria-labelledby="contact-title">
      <div className="container contact__grid">
        <div>
          <SectionHead eyebrow={c.eyebrow} title={c.title} id="contact-title" />
          <address className="contact__info" data-reveal>
            <ul>
              {info.map(([icon, label, value]) => (
                <li key={icon}>
                  <span className="contact__icon">
                    <Icon name={icon} size={20} />
                  </span>
                  <span className="contact__label">{label}</span>
                  <span>{value}</span>
                </li>
              ))}
            </ul>
            <p className="contact__owner">
              {brand.owner} · УНП {brand.unp}
            </p>
          </address>
          <a href={mapsUrl} className="btn btn--accent" target="_blank" rel="noopener noreferrer" data-reveal>
            <Icon name="route" size={18} /> {c.route}
          </a>
        </div>
        <div className="contact__map" data-reveal>
          <iframe title={c.mapTitle} src={mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </div>
    </section>
  )
}
