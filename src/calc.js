// Чистая логика калькулятора — без React, легко проверить отдельно.
import { extras, gases, onsite, range, repairs, vehicles } from './config.js'

export const initialState = (vehicleId = 'car') => {
  const v = vehicles.find((x) => x.id === vehicleId)
  return { vehicle: v.id, gas: 'r134a', grams: v.grams, refill: true, extras: { diag: true }, repairs: {}, onsite: false, km: 0 }
}

// Строки сметы: { id, kind, amount, price, free? }
export function estimate(s) {
  const v = vehicles.find((x) => x.id === s.vehicle)
  const gas = gases.find((g) => g.id === s.gas)
  const lines = []

  if (s.refill) {
    lines.push({ id: 'refill', kind: 'work', price: v.refill })
    lines.push({ id: 'gas', kind: 'gas', amount: s.grams, price: round(s.grams * gas.perGram) })
  }
  extras
    .filter((e) => s.extras[e.id])
    .forEach((e) => {
      const free = e.freeWithRefill && s.refill
      lines.push({ id: e.id, kind: 'extra', price: free ? 0 : e.price, free })
    })
  repairs
    .filter((r) => s.repairs[r.id])
    .forEach((r) => lines.push({ id: r.id, kind: 'repair', price: round(r.price * v.repair), from: true }))
  if (s.onsite) lines.push({ id: 'onsite', kind: 'onsite', amount: s.km, price: onsite.base + s.km * 2 * onsite.perKm })

  const total = lines.reduce((sum, l) => sum + l.price, 0)
  const hasRepair = lines.some((l) => l.kind === 'repair')
  return {
    lines,
    total,
    hasRepair,
    low: Math.floor((total * range.low) / 5) * 5,
    high: Math.ceil((total * (hasRepair ? range.high + 0.1 : range.high)) / 5) * 5,
  }
}

const round = (n) => Math.round(n * 100) / 100

export const fmt = (n) => n.toLocaleString('ru-RU', { minimumFractionDigits: 0, maximumFractionDigits: 2 })
