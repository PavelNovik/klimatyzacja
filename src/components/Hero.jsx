import t from '../content.js'
import { img, srcSet } from '../config.js'
import Icon from './Icon.jsx'

export default function Hero() {
  const h = t.hero
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <img className="hero__bg" src={img('hero')} srcSet={srcSet('hero')} sizes="100vw" alt="" fetchPriority="high" />
      <div className="hero__frost" aria-hidden="true" />
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="eyebrow eyebrow--light">{h.eyebrow}</p>
          <h1 id="hero-title">
            {h.title[0]} <span className="hero__cold">{h.title[1]}</span>
          </h1>
          <p className="hero__lead">{h.lead}</p>
          <ul className="hero__chips">
            {h.chips.map((c) => (
              <li key={c}>{c}</li>
            ))}
            <li className="hero__chip--warm">
              <Icon name="route" size={16} /> {h.onsite}
            </li>
          </ul>
          <div className="hero__ctas">
            <a href="#calculator" className="btn btn--accent">
              {h.calc} <Icon name="arrow" size={18} />
            </a>
            <a href="#booking" className="btn btn--glass">
              {h.book}
            </a>
          </div>
        </div>

        <aside className="thermo" aria-label={`${h.thermo.out} +32°, ${h.thermo.in} +6°`}>
          <div className="thermo__row">
            <span className="thermo__label">{h.thermo.out}</span>
            <span className="thermo__val thermo__val--hot mono">+32°</span>
          </div>
          <div className="thermo__scale" aria-hidden="true">
            <span className="thermo__fill" />
            <span className="thermo__ticks" />
          </div>
          <div className="thermo__row">
            <span className="thermo__label">
              {h.thermo.in} · {h.thermo.after}
            </span>
            <span className="thermo__val thermo__val--cold mono">+6°</span>
          </div>
          <ul className="thermo__facts">
            {h.facts.map(([a, b]) => (
              <li key={b}>
                <strong className="mono">{a}</strong>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  )
}
