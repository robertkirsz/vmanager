import type { SortDirectionType } from 'types'

export const ascendingBy = (key: string) => (a: any, b: any) =>
  a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0

export const descendingBy = (key: string) => (a: any, b: any) =>
  a[key] < b[key] ? 1 : a[key] > b[key] ? -1 : 0

export const sort = (array: any[], property: string, direction: SortDirectionType) => {
  if (direction === 'ascending') return [...array].sort(ascendingBy(property))
  if (direction === 'descending') return [...array].sort(descendingBy(property))
  return array
}
