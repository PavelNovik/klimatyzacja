import t from '../content.js'
import { imgSm } from '../config.js'
import SectionHead from './SectionHead.jsx'

export default function Services() {
  const s = t.services
  return (
    <section className="section services" id="services" aria-labelledby="services-title">
      <div className="container">
        <SectionHead eyebrow={s.eyebrow} title={s.title} lead={s.lead} id="services-title" />
        <ul className="services__grid">
          {s.items.map((it, i) => (
            <li key={it.title} className="card service" data-reveal style={{ '--d': `${(i % 3) * 70}ms` }}>
              <div className="service__img">
                <img src={imgSm(it.img)} alt="" loading="lazy" width="500" height="380" />
                <span className="service__num mono">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <div className="service__body">
                <h3>{it.title}</h3>
                <p>{it.text}</p>
                <ul className="tags">
                  {it.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>

        <h3 className="vehicles__title" data-reveal>
          {s.vehiclesTitle}
        </h3>
        <ul className="vehicles">
          {s.vehicles.map((v, i) => (
            <li key={v.title} className="vehicle" data-reveal style={{ '--d': `${i * 70}ms` }}>
              <img src={imgSm(v.img)} alt={v.title} loading="lazy" width="450" height="350" />
              <div>
                <strong>{v.title}</strong>
                <span>{v.text}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
