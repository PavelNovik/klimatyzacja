import t from '../content.js'
import SectionHead from './SectionHead.jsx'

export default function Faq() {
  const f = t.faq
  return (
    <section className="section faq" aria-labelledby="faq-title">
      <div className="container faq__grid">
        <SectionHead eyebrow={f.eyebrow} title={f.title} id="faq-title" />
        <div className="faq__list" data-reveal>
          {f.items.map((it) => (
            <details key={it.q}>
              <summary>{it.q}</summary>
              <p>{it.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
