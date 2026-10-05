import t from '../content.js'
import RequestForm, { Field } from './RequestForm.jsx'
import SectionHead from './SectionHead.jsx'
import Icon from './Icon.jsx'

// Минимальная дата записи — сегодня (локальная дата, без сдвига UTC)
const today = () => {
  const d = new Date()
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10)
}

export default function Booking({ draft, setDraft }) {
  const b = t.booking
  return (
    <section className="section booking" id="booking" aria-labelledby="booking-title">
      <div className="container booking__grid">
        <div>
          <SectionHead eyebrow={b.eyebrow} title={b.title} lead={b.lead} id="booking-title" />
          <p className="booking__coffee" data-reveal>
            <Icon name="coffee" size={22} /> {t.coffee.title}
          </p>
        </div>
        <div data-reveal>
          <RequestForm
            className="form--card"
            subject={b.subject}
            fields={(d) => [
              [b.name, d.get('name')],
              [b.phone, d.get('phone')],
              [b.vehicle, d.get('vehicle')],
              [b.service, d.get('service')],
              [b.date, d.get('date') && new Date(d.get('date') + 'T12:00:00').toLocaleDateString('ru-RU')],
              [b.time, d.get('time')],
              [b.comment, d.get('comment')],
              [b.estimate, draft && '\n' + draft],
            ]}
          >
            <div className="form__row">
              <Field label={b.name} required>
                <input name="name" autoComplete="name" required />
              </Field>
              <Field label={b.phone} required>
                <input name="phone" type="tel" autoComplete="tel" placeholder="+375" required />
              </Field>
            </div>
            <div className="form__row">
              <Field label={b.vehicle} required>
                <input name="vehicle" placeholder={b.vehiclePlaceholder} required />
              </Field>
              <Field label={b.service}>
                <select name="service">
                  {b.services.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </Field>
            </div>
            <div className="form__row">
              <Field label={b.date} required>
                <input name="date" type="date" min={today()} required suppressHydrationWarning />
              </Field>
              <Field label={b.time}>
                <select name="time">
                  {b.times.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </Field>
            </div>
            <Field label={b.comment}>
              <textarea name="comment" rows={2} placeholder={b.commentPlaceholder} />
            </Field>
            {draft && (
              <div className="field">
                <span className="field__label">
                  {b.estimate}
                  <button type="button" className="icon-btn" aria-label="Убрать расчёт" onClick={() => setDraft('')}>
                    <Icon name="close" size={16} />
                  </button>
                </span>
                <pre className="booking__draft mono">{draft}</pre>
              </div>
            )}
            <label className="check check--consent">
              <input type="checkbox" required />
              <span className="check__box" aria-hidden="true">
                <Icon name="check" size={16} />
              </span>
              <span>
                <small>{b.consent}</small>
              </span>
            </label>
          </RequestForm>
        </div>
      </div>
    </section>
  )
}
