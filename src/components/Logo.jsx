import { brand } from '../config.js'

// Знак: снежинка-вентилятор, тёплая точка в центре
export default function Logo() {
  return (
    <span className="logo">
      <svg className="logo__mark" viewBox="0 0 40 40" width="40" height="40" aria-hidden="true">
        <rect width="40" height="40" rx="11" fill="var(--navy)" />
        <g stroke="var(--cyan)" strokeWidth="3" strokeLinecap="round" className="logo__fan">
          <path d="M20 7v26M8.7 13.5l22.6 13M8.7 26.5l22.6-13" />
        </g>
        <circle cx="20" cy="20" r="4" fill="var(--warm)" />
      </svg>
      <span className="logo__text">
        <strong>{brand.name}</strong>
        <small>автокондиционеры · Слуцк</small>
      </span>
    </span>
  )
}
