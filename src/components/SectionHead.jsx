export default function SectionHead({ eyebrow, title, lead, id, center, light }) {
  return (
    <header className={`head${center ? ' head--center' : ''}${light ? ' head--light' : ''}`} data-reveal>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id}>{title}</h2>
      {lead && <p className="head__lead">{lead}</p>}
    </header>
  )
}
