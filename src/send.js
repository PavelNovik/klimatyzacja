// Отправка заявок без бэкенда: собираем текст и открываем почту / Viber / Telegram.
import { brand } from './config.js'

export function buildText(subject, fields) {
  return [subject, '', ...fields.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`)].join('\n')
}

async function copy(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}

// Возвращает true, если текст скопирован в буфер (для мессенджеров)
export async function send(channel, subject, text) {
  if (channel === 'email') {
    window.location.href = `mailto:${brand.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`
    return false
  }
  const copied = await copy(text)
  if (channel === 'viber') {
    // Открываем чат с мастерской; текст уже в буфере обмена
    window.location.href = `viber://chat?number=${encodeURIComponent(brand.viber)}`
  } else {
    window.open(`https://t.me/${brand.telegram}`, '_blank', 'noopener')
  }
  return copied
}
