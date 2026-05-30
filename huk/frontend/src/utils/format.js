export function money(amount) {
  return `₹${Number(amount || 0).toLocaleString('en-IN')}`
}

export function festivalDate() {
  return new Date('2026-09-14T08:00:00+05:30')
}
