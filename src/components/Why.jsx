import t from '../content.js'
import Icon from './Icon.jsx'
import SectionHead from './SectionHead.jsx'

export default function Why() {
  const w = t.why
  return (
    <section className="section why" id="why" aria-labelledby="why-title">
      <div className="container">
        <SectionHead eyebrow={w.eyebrow} title={w.title} id="why-title" light />
        <ul className="why__grid">
          {w.items.map((it, i) => (
            <li key={it.title} className="why__item" data-reveal style={{ '--d': `${(i % 3) * 70}ms` }}>
              <span className="why__icon">
                <Icon name={it.icon} size={26} />
              </span>
              <h3>{it.title}</h3>
              <p>{it.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
