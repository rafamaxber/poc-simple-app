import { ProductFilters, ProductResponse } from './types'

export default class ProductApi {
  static async fetchProducts(filters: ProductFilters): Promise<ProductResponse> {
    const queryParams = new URLSearchParams()
    if (filters.q) queryParams.set('q', filters.q)
    if (filters.limit) queryParams.set('limit', filters.limit.toString())
    if (filters.select) queryParams.set('select', filters.select.join(','))
    if (filters.skip) queryParams.set('skip', filters.skip.toString())

    const response = await fetch(`https://dummyjson.com/products/search?${queryParams.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    return data
  }
}