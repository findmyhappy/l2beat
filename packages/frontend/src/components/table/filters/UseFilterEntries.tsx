import { useCallback } from 'react'
import { useTableFilterContext } from './TableFilterContext'
import type { FilterableEntry, FilterableValueId } from './filterableValue'

export function useFilterEntries() {
  const { state } = useTableFilterContext()

  const filter = useCallback(
    ({ filterable }: FilterableEntry) => {
      if (filterable === undefined) {
        return true
      }

      for (const id in state) {
        const filter = state[id as FilterableValueId]

        const matches = filterable.some(
          (f) => f.id === id && filter?.values.includes(f.value),
        )
        const result = filter?.inversed ? !matches : matches

        if (result === false) {
          return false
        }
      }
      return true
    },

    [state],
  )

  return filter
}
