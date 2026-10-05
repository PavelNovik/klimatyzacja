import { useRef, useState } from 'react'
import t from '../content.js'
import { buildText, send } from '../send.js'
import Icon from './Icon.jsx'

// Форма заявки без бэкенда: проверка полей → текст заявки → почта / Viber / Telegram
export default function RequestForm({ subject, fields, children, className = '', title }) {
  const form = useRef(null)
  const [status, setStatus] = useState(null)

  const onSend = async (channel) => {
    if (!form.current.reportValidity()) return
    const text = buildText(subject, fields(new FormData(form.current)))
    const copied = await send(channel, subject, text)
    setStatus(copied ? 'copied' : 'thanks')
  }

  return (
    <form ref={form} className={`form ${className}`} onSubmit={(e) => (e.preventDefault(), onSend('email'))} noValidate={false}>
      {title && <h3 className="form__title">{title}</h3>}
      {children}
      <div className="form__send">
        <span className="form__via">{t.send.via}:</span>
        <button type="submit" className="btn btn--accent">
          <Icon name="mail" size={18} /> {t.send.email}
        </button>
        <button type="button" className="btn btn--viber" onClick={() => onSend('viber')}>
          <Icon name="viber" size={18} /> {t.send.viber}
        </button>
        <button type="button" className="btn btn--tg" onClick={() => onSend('telegram')}>
          <Icon name="telegram" size={18} /> {t.send.telegram}
        </button>
      </div>
      <p className="form__status" role="status" aria-live="polite">
        {status && (
          <>
            <Icon name="check" size={18} /> {status === 'copied' ? `${t.send.copied} ${t.send.thanks}` : t.send.thanks}
          </>
        )}
      </p>
    </form>
  )
}

export function Field({ label, required, children, wide }) {
  return (
    <label className={`field${wide ? ' field--wide' : ''}`}>
      <span className="field__label">
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </span>
      {children}
    </label>
  )
}
