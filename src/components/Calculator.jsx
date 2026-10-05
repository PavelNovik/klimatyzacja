import { useMemo, useState } from 'react'
import t from '../content.js'
import { extras, gases, onsite, repairs, vehicles } from '../config.js'
import { estimate, fmt, initialState } from '../calc.js'
import Icon from './Icon.jsx'
import SectionHead from './SectionHead.jsx'

const c = t.calc

// Название строки сметы
const lineName = (l, s) => {
  if (l.id === 'gas') return `${c.summary.lines.gas} ${c.gas[s.gas]}, ${fmt(l.amount)} ${c.gram}`
  if (l.id === 'onsite') return `${c.summary.lines.onsite}${l.amount ? `, ${l.amount} ${c.kmUnit}` : ` ${c.kmCity}`}`
  if (l.kind === 'work') return c.summary.lines.refill
  return (c.extras[l.id] || c.repairs[l.id])[0]
}

export function estimateText(s) {
  const e = estimate(s)
  return [
    `${c.vehicles[s.vehicle]}:`,
    ...e.lines.map((l) => `— ${lineName(l, s)}: ${l.free ? c.free : `${l.from ? c.from + ' ' : ''}${fmt(l.price)} BYN`}`),
    `${c.summary.range}: ${e.low}–${e.high} BYN`,
  ].join('\n')
}

export default function Calculator({ onBook }) {
  const [s, setS] = useState(() => initialState())
  const e = useMemo(() => estimate(s), [s])
  const v = vehicles.find((x) => x.id === s.vehicle)

  const set = (patch) => setS((p) => ({ ...p, ...patch }))
  const toggle = (group, id) => setS((p) => ({ ...p, [group]: { ...p[group], [id]: !p[group][id] } }))
  const pickVehicle = (id) => {
    const nv = vehicles.find((x) => x.id === id)
    set({ vehicle: id, grams: nv.grams })
  }

  const fill = ((s.grams - v.min) / (v.max - v.min)) * 100

  return (
    <section className="section calc" id="calculator" aria-labelledby="calc-title">
      <div className="container">
        <SectionHead eyebrow={c.eyebrow} title={c.title} lead={c.lead} id="calc-title" />
        <div className="calc__grid">
          <div className="calc__steps" data-reveal>
            {/* 1. Техника */}
            <fieldset className="step">
              <legend>
                <span className="step__n mono">01</span> {c.step[0]}
              </legend>
              <div className="seg seg--vehicles" role="radiogroup">
                {vehicles.map((x) => (
                  <label key={x.id} className={`seg__opt${s.vehicle === x.id ? ' is-on' : ''}`}>
                    <input type="radio" name="vehicle" checked={s.vehicle === x.id} onChange={() => pickVehicle(x.id)} />
                    {c.vehicles[x.id]}
                  </label>
                ))}
              </div>
            </fieldset>

            {/* 2. Фреон */}
            <fieldset className="step">
              <legend>
                <span className="step__n mono">02</span> {c.step[1]}
              </legend>
              <label className="check check--big">
                <input type="checkbox" checked={s.refill} onChange={() => set({ refill: !s.refill })} />
                <span className="check__box" aria-hidden="true">
                  <Icon name="check" size={16} />
                </span>
                <span>
                  <strong>{c.refill}</strong>
                  <small>{c.refillHint}</small>
                </span>
                <span className="check__price mono">{v.refill} BYN</span>
              </label>
              <div className={`gasbox${s.refill ? '' : ' is-off'}`}>
                <div className="seg seg--gas" role="radiogroup">
                  {gases.map((g) => (
                    <label key={g.id} className={`seg__opt${s.gas === g.id ? ' is-on' : ''}`}>
                      <input type="radio" name="gas" disabled={!s.refill} checked={s.gas === g.id} onChange={() => set({ gas: g.id })} />
                      <strong className="mono">{c.gas[g.id]}</strong>
                      <small>
                        {c.gasHint[g.id]} · {fmt(g.perGram * 100)} BYN/100 {c.gram}
                      </small>
                    </label>
                  ))}
                </div>
                <label className="range">
                  <span className="range__head">
                    <span>{c.grams}</span>
                    <output className="mono">
                      {fmt(s.grams)} {c.gram}
                    </output>
                  </span>
                  <input
                    type="range"
                    min={v.min}
                    max={v.max}
                    step={50}
                    value={s.grams}
                    disabled={!s.refill}
                    style={{ '--fill': `${fill}%` }}
                    onChange={(ev) => set({ grams: +ev.target.value })}
                  />
                  <span className="range__scale mono" aria-hidden="true">
                    <span>{fmt(v.min)}</span>
                    <span>{fmt(v.max)}</span>
                  </span>
                  <small className="hint">{c.gramsHint}</small>
                </label>
              </div>
            </fieldset>

            {/* 3. Дополнительно */}
            <fieldset className="step">
              <legend>
                <span className="step__n mono">03</span> {c.step[2]}
              </legend>
              <div className="checks">
                {extras.map((x) => {
                  const free = x.freeWithRefill && s.refill
                  return (
                    <label key={x.id} className="check">
                      <input type="checkbox" checked={!!s.extras[x.id]} onChange={() => toggle('extras', x.id)} />
                      <span className="check__box" aria-hidden="true">
                        <Icon name="check" size={16} />
                      </span>
                      <span>
                        <strong>{c.extras[x.id][0]}</strong>
                        <small>{c.extras[x.id][1]}</small>
                      </span>
                      <span className={`check__price mono${free ? ' is-free' : ''}`}>{free ? c.free : `${x.price} BYN`}</span>
                    </label>
                  )
                })}
              </div>
            </fieldset>

            {/* 4. Ремонт */}
            <fieldset className="step">
              <legend>
                <span className="step__n mono">04</span> {c.step[3]}
              </legend>
              <div className="checks">
                {repairs.map((x) => (
                  <label key={x.id} className="check">
                    <input type="checkbox" checked={!!s.repairs[x.id]} onChange={() => toggle('repairs', x.id)} />
                    <span className="check__box" aria-hidden="true">
                      <Icon name="check" size={16} />
                    </span>
                    <span>
                      <strong>{c.repairs[x.id][0]}</strong>
                      <small>{c.repairs[x.id][1]}</small>
                    </span>
                    <span className="check__price mono">
                      {c.from} {Math.round(x.price * v.repair)} BYN
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* 5. Выезд */}
            <fieldset className="step">
              <legend>
                <span className="step__n mono">05</span> {c.step[4]}
              </legend>
              <label className="check">
                <input type="checkbox" checked={s.onsite} onChange={() => set({ onsite: !s.onsite })} />
                <span className="check__box" aria-hidden="true">
                  <Icon name="check" size={16} />
                </span>
                <span>
                  <strong>{c.onsite}</strong>
                  <small>{c.onsiteHint}</small>
                </span>
                <span className="check__price mono">
                  {c.from} {onsite.base} BYN
                </span>
              </label>
              {s.onsite && (
                <label className="range">
                  <span className="range__head">
                    <span>{c.km}</span>
                    <output className="mono">{s.km ? `${s.km} ${c.kmUnit}` : c.kmCity}</output>
                  </span>
                  <input
                    type="range"
                    min={0}
                    max={onsite.maxKm}
                    step={5}
                    value={s.km}
                    style={{ '--fill': `${(s.km / onsite.maxKm) * 100}%` }}
                    onChange={(ev) => set({ km: +ev.target.value })}
                  />
                </label>
              )}
            </fieldset>
          </div>

          {/* Смета */}
          <aside className="receipt" aria-live="polite" data-reveal>
            <div className="receipt__head">
              <span className="eyebrow">{c.summary.title}</span>
              <span className="receipt__vehicle">{c.vehicles[s.vehicle]}</span>
            </div>
            {e.lines.length ? (
              <ul className="receipt__lines">
                {e.lines.map((l) => (
                  <li key={l.id}>
                    <span>{lineName(l, s)}</span>
                    <span className={`mono${l.free ? ' is-free' : ''}`}>
                      {l.free ? c.free : `${l.from ? c.from + ' ' : ''}${fmt(l.price)}`}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="receipt__empty">{c.summary.empty}</p>
            )}
            <div className="receipt__total">
              <span>{c.summary.total}</span>
              <strong className="mono">
                {fmt(Math.round(e.total))} <small>BYN</small>
              </strong>
            </div>
            {e.lines.length > 0 && (
              <p className="receipt__range mono">
                {c.summary.range}: {e.low}–{e.high} BYN
              </p>
            )}
            <p className="receipt__coffee">
              <Icon name="coffee" size={18} /> {c.summary.coffee}
            </p>
            <p className="receipt__note">{c.summary.note}</p>
            <div className="receipt__actions">
              <button type="button" className="btn btn--accent" disabled={!e.lines.length} onClick={() => onBook(estimateText(s))}>
                {c.summary.book} <Icon name="arrow" size={18} />
              </button>
              <button type="button" className="link-btn" onClick={() => setS(initialState())}>
                <Icon name="reset" size={16} /> {c.summary.reset}
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
