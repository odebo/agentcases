import { Case } from './types'

export function groupByDate(cases: Case[]): Record<string, Case[]> {
  return cases.reduce((acc, c) => {
    const date = c.date.split('T')[0]
    acc[date] = acc[date] ? [...acc[date], c] : [c]
    return acc
  }, {} as Record<string, Case[]>)
}
