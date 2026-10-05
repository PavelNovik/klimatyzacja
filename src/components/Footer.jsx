import t from '../content.js'
import { brand, credits, phoneHref } from '../config.js'
import { openCookieSettings } from './CookieConsent.jsx'
import Icon from './Icon.jsx'
import Logo from './Logo.jsx'

export default function Footer() {
  const f = t.footer
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <Logo />
          <p className="footer__tagline">{f.tagline}</p>
          <p className="footer__owner">
            {brand.owner}
            <br />
            УНП {brand.unp} · {brand.street}, {brand.postalCode} {brand.city}
          </p>
        </div>
        <nav aria-label="Разделы">
          <ul className="footer__nav">
            {t.nav.items.map(([id, label]) => (
              <li key={id}>
                <a href={`#${id}`}>{label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="footer__contact">
          <a href={phoneHref} className="mono">
            {brand.phone}
          </a>
          <a href={`mailto:${brand.email}`}>{brand.email}</a>
          {t.contact.hours.map((h) => (
            <span key={h}>{h}</span>
          ))}
        </div>
      </div>
      <div className="container footer__bottom">
        <span>
          © {new Date().getFullYear()} {brand.name}. {f.rights}
        </span>
        <span className="footer__credits">
          {f.photos}:{' '}
          {[...new Map(credits.map((c) => [c.author, c])).values()].map((c, i, a) => (
            <span key={c.author}>
              <a href={c.url} target="_blank" rel="noopener noreferrer">
                {c.author}
              </a>
              {i < a.length - 1 ? ', ' : ''}
            </span>
          ))}{' '}
          / Unsplash
        </span>
        <button type="button" className="link-btn" onClick={openCookieSettings}>
          {f.cookies}
        </button>
        <a href="#top" className="footer__top">
          <Icon name="arrowUp" size={16} /> {f.top}
        </a>
      </div>
    </footer>
  )
}
