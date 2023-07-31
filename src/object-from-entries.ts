/** @private */
type ObjectFromEntries<Entry extends readonly [PropertyKey, unknown]> = {
  [K in Entry[0]]: Entry extends readonly [K, infer Value] ? Value : Entry[1]
}

export function objectFromEntries<Entry extends readonly [PropertyKey, unknown]>(entries: readonly Entry[]): ObjectFromEntries<Entry> {
  return Object.fromEntries(entries) as ObjectFromEntries<Entry>
}
