import { ProductFilters } from '../api/types'
import { useSearchParams } from 'react-router'
import { useCallback } from 'react'

export function useProductFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const q = searchParams.get('q') || '' as ProductFilters['q']
  const limit = searchParams.get('limit') || 10 as ProductFilters['limit']
  const select = searchParams.getAll('select') as ProductFilters['select']
  const skip = searchParams.get('skip') as ProductFilters['skip']
  
  const setFilters = useCallback((filters: ProductFilters) => {
    setSearchParams((params) => {
      if (filters.q !== undefined) {
        params.set('q', String(filters.q || ''))
      }
      
      if (filters.limit) {
        params.set('limit', String(filters.limit))
      }
      
      if (filters.skip) {
        params.set('skip', String(filters.skip))
      }
      
      if (filters.select?.length) {
        params.set('select', filters.select.join(','))
      }

      return params
    })
  }, [])

  const resetFilters = useCallback(() => {
    setSearchParams()
  }, [])

  return {
    q,
    limit,
    select,
    skip,
    setFilters,
    resetFilters
  }
}
