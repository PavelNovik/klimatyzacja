import t from '../content.js'
import SectionHead from './SectionHead.jsx'

export default function Process() {
  const p = t.process
  return (
    <section className="section process" aria-labelledby="process-title">
      <div className="container">
        <SectionHead eyebrow={p.eyebrow} title={p.title} id="process-title" center />
        <ol className="process__list">
          {p.steps.map((s, i) => (
            <li key={s.title} data-reveal style={{ '--d': `${i * 90}ms` }}>
              <span className="process__n mono">{String(i + 1).padStart(2, '0')}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
