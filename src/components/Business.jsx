import t from '../content.js'
import { img } from '../config.js'
import Icon from './Icon.jsx'
import RequestForm, { Field } from './RequestForm.jsx'
import SectionHead from './SectionHead.jsx'

export default function Business() {
  const b = t.business
  const f = b.form
  return (
    <section className="section business" id="business" aria-labelledby="business-title">
      <img className="business__bg" src={img('fleet')} alt="" loading="lazy" />
      <div className="container">
        <SectionHead eyebrow={b.eyebrow} title={b.title} lead={b.lead} id="business-title" light />
        <div className="business__grid">
          <ul className="business__list">
            {b.items.map((it, i) => (
              <li key={it.title} data-reveal style={{ '--d': `${(i % 2) * 70}ms` }}>
                <Icon name={it.icon} size={24} />
                <div>
                  <h3>{it.title}</h3>
                  <p>{it.text}</p>
                </div>
              </li>
            ))}
          </ul>
          <div data-reveal>
            <RequestForm
              className="form--card"
              title={f.title}
              subject={f.subject}
              fields={(d) => [
                [f.company, d.get('company')],
                [f.unp, d.get('unp')],
                [f.contact, d.get('contact')],
                [f.phone, d.get('phone')],
                [f.fleet, d.get('fleet')],
                [f.comment, d.get('comment')],
              ]}
            >
              <div className="form__row">
                <Field label={f.company} required>
                  <input name="company" autoComplete="organization" required />
                </Field>
                <Field label={f.unp}>
                  <input name="unp" inputMode="numeric" pattern="[0-9]{9}" maxLength={9} />
                </Field>
              </div>
              <div className="form__row">
                <Field label={f.contact} required>
                  <input name="contact" autoComplete="name" required />
                </Field>
                <Field label={f.phone} required>
                  <input name="phone" type="tel" autoComplete="tel" placeholder="+375" required />
                </Field>
              </div>
              <Field label={f.fleet} required>
                <textarea name="fleet" rows={2} placeholder={f.fleetPlaceholder} required />
              </Field>
              <Field label={f.comment}>
                <textarea name="comment" rows={2} />
              </Field>
            </RequestForm>
          </div>
        </div>
      </div>
    </section>
  )
}
