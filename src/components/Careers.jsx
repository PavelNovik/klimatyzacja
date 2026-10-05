import t from '../content.js'
import { imgSm } from '../config.js'
import Icon from './Icon.jsx'
import RequestForm, { Field } from './RequestForm.jsx'
import SectionHead from './SectionHead.jsx'

export default function Careers() {
  const c = t.careers
  const f = c.form
  return (
    <section className="section careers" id="careers" aria-labelledby="careers-title">
      <div className="container">
        <SectionHead eyebrow={c.eyebrow} title={c.title} lead={c.lead} id="careers-title" />
        <div className="careers__grid">
          <div className="careers__jobs">
            {c.jobs.map((j, i) => (
              <article key={j.title} className="card job" data-reveal style={{ '--d': `${i * 80}ms` }}>
                <span className="job__type mono">{j.type}</span>
                <h3>{j.title}</h3>
                {j.salary && <p className="job__salary mono">{j.salary}</p>}
                <ul>
                  {j.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </article>
            ))}
            <ul className="careers__offer" data-reveal>
              {c.offer.map((o) => (
                <li key={o}>
                  <Icon name="check" size={18} /> {o}
                </li>
              ))}
            </ul>
            <img className="careers__photo" src={imgSm('career')} alt="Мастер у инструментальной тележки" loading="lazy" width="500" height="600" data-reveal />
          </div>
          <div data-reveal>
            <RequestForm
              className="form--card careers__form"
              title={f.title}
              subject={f.subject}
              fields={(d) => [
                [f.name, d.get('name')],
                [f.phone, d.get('phone')],
                [f.position, d.get('position')],
                [f.experience, d.get('experience')],
              ]}
            >
              <div className="form__row">
                <Field label={f.name} required>
                  <input name="name" autoComplete="name" required />
                </Field>
                <Field label={f.phone} required>
                  <input name="phone" type="tel" autoComplete="tel" placeholder="+375" required />
                </Field>
              </div>
              <Field label={f.position}>
                <select name="position">
                  {c.jobs.map((j) => (
                    <option key={j.title}>{j.title}</option>
                  ))}
                </select>
              </Field>
              <Field label={f.experience}>
                <textarea name="experience" rows={4} />
              </Field>
            </RequestForm>
          </div>
        </div>
      </div>
    </section>
  )
}
