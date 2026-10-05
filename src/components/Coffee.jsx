import t from '../content.js'
import { imgSm } from '../config.js'
import Icon from './Icon.jsx'

export default function Coffee() {
  const c = t.coffee
  return (
    <section className="section coffee" id="coffee" aria-labelledby="coffee-title">
      <div className="container coffee__grid">
        <div className="coffee__photos" data-reveal>
          <img className="coffee__main" src={imgSm('workshop')} alt="Мастер работает с автомобилем в боксе" loading="lazy" width="500" height="600" />
          <img className="coffee__cup" src={imgSm('coffee')} alt="Чашка кофе" loading="lazy" width="500" height="600" />
          <span className="coffee__badge">
            <Icon name="coffee" size={22} /> {c.badge}
          </span>
        </div>
        <div data-reveal>
          <p className="eyebrow eyebrow--warm">{c.eyebrow}</p>
          <h2 id="coffee-title">{c.title}</h2>
          <p className="coffee__text">{c.text}</p>
          <ul className="coffee__points">
            {c.points.map((p) => (
              <li key={p}>
                <Icon name="check" size={18} /> {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
