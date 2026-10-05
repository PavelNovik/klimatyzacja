import t from '../content.js'
import reviews from '../reviews.js'
import { reviewUrl } from '../config.js'
import Icon from './Icon.jsx'
import SectionHead from './SectionHead.jsx'

const month = (d) => new Date(`${d}-01T12:00:00`).toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })

export default function Reviews() {
  const r = t.reviews
  return (
    <section className="section reviews" id="reviews" aria-labelledby="reviews-title">
      <div className="container">
        <div className="reviews__top">
          <SectionHead eyebrow={r.eyebrow} title={r.title} id="reviews-title" />
          <a href={reviewUrl} className="btn btn--ghost" target="_blank" rel="noopener noreferrer" data-reveal>
            <Icon name="star" size={18} /> {r.google}
          </a>
        </div>
        <ul className="reviews__grid">
          {reviews.map((rv, i) => (
            <li key={rv.name + rv.date} className="card review" data-reveal style={{ '--d': `${(i % 3) * 70}ms` }}>
              <span className="review__stars" role="img" aria-label={`${rv.rating} из 5`}>
                {Array.from({ length: 5 }, (_, k) => (
                  <Icon key={k} name="star" size={16} className={k < rv.rating ? 'on' : ''} />
                ))}
              </span>
              <blockquote>{rv.text}</blockquote>
              <footer>
                <span className="review__avatar" aria-hidden="true">
                  {rv.name.replace(/[^А-ЯA-Z]/g, '')[0]}
                </span>
                <span>
                  <strong>{rv.name}</strong>
                  <small>
                    {rv.car} · {month(rv.date)}
                  </small>
                </span>
              </footer>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
