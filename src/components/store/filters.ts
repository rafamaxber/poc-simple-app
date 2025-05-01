import { create } from 'zustand'
import { useSearchParams } from 'react-router'
import { devtools } from 'zustand/middleware'

import { Product, ProductFilters } from '../api/types'

interface State extends ProductFilters {
}

type Action = {
  setFilters: (filters: State) => void
  resetFilters: () => void
  updateFilters: (filters: Partial<State>) => void
}

const initialFilters: State = buildInitialFilters()

function buildInitialFilters(): State {
  const searchParams = new URLSearchParams(window.location.search)
alert('buildInitialFilters')
  return {
    q: searchParams.get('q') || '',
    limit: searchParams.get('limit') || 10,
    select: searchParams.getAll('select') as unknown as (keyof Product)[] || [],
    skip: searchParams.get('skip') || null,
  }
}

const store = (set: any) => ({
  ...initialFilters,
  setFilters: (filters: State) => {
    updateRoute(filters)
    return set(filters, undefined, 'm_app_filters/setFilters');
  },
  resetFilters: () => {
    updateRoute({})
    return set(initialFilters, undefined, 'm_app_filters/resetFilters')
  },
  updateFilters: (filters: Partial<State>) => {
    return set((state: State) => ({ ...state, ...filters }), undefined, 'm_app_filters/updateFilters')
  },
})

const useFilters = create<State & Action>()(
  devtools(store)
)

function updateRoute(data) {
  const searchParams = new URLSearchParams()
  Object.entries(data).forEach(([key, value]) => {
    if (value) {
      searchParams.set(key, value)
    }
  })

  window.history.replaceState(null, '', `?${searchParams.toString()}`)
}

export default useFilters
