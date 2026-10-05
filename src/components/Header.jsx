import { useEffect, useState } from 'react'
import t from '../content.js'
import { brand, phoneHref } from '../config.js'
import Icon from './Icon.jsx'
import Logo from './Logo.jsx'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('no-scroll', open)
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className={`header${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
      <div className="container header__bar">
        <a href="#top" className="header__logo" onClick={close} aria-label={brand.name}>
          <Logo />
        </a>
        <nav className="header__nav" id="menu" aria-label="Основное меню">
          <ul>
            {t.nav.items.map(([id, label]) => (
              <li key={id}>
                <a href={`#${id}`} onClick={close}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <a href={phoneHref} className="header__phone header__phone--menu mono">
            <Icon name="phone" size={18} /> {brand.phone}
          </a>
        </nav>
        <a href={phoneHref} className="header__phone mono">
          <Icon name="phone" size={18} /> <span>{brand.phone}</span>
        </a>
        <a href="#booking" className="btn btn--accent btn--small header__cta" onClick={close}>
          {t.nav.book}
        </a>
        <button
          type="button"
          className="header__burger"
          aria-expanded={open}
          aria-controls="menu"
          aria-label={open ? t.nav.close : t.nav.menu}
          onClick={() => setOpen((o) => !o)}
        >
          <Icon name={open ? 'close' : 'menu'} />
        </button>
      </div>
    </header>
  )
}
