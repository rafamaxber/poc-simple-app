import { db } from '../db/db'
import { Product, ProductFilters, ProductResponse } from './types'

export default class ProductApi {
  static async fetchProducts(
    filters: ProductFilters
  ): Promise<ProductResponse> {

    const isValidCache = await ProductApi.productCacheIsValid()
    if (isValidCache) {
      return ProductApi.fetchProductsFromCache(filters);
    }

    const queryParams = new URLSearchParams();
    if (filters.q) queryParams.set("q", filters.q);
    if (filters.limit) queryParams.set("limit", filters.limit.toString());
    if (filters.select) queryParams.set("select", filters.select.join(","));
    if (filters.skip) queryParams.set("skip", filters.skip.toString());

    const response = await fetch(
      `https://dummyjson.com/products/search?limit=200`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    ProductApi.saveProductCache(data.products)

    return data;
  }

  static saveProductCache(productList: Product[]) {
    return db.product.bulkAdd(productList).then(() => {
      const expireAt = new Date(addDays(new Date(), 1)).toISOString();
      return db.productTableExpire.add({
        id: 1,
        expireAt,
      });
    });
  }

  static async productCacheIsValid() {
    const productTableExpire = await db.productTableExpire.get(1);
    const isValid =
      productTableExpire?.id &&
      new Date(productTableExpire?.expireAt).getTime() > Date.now();

      return isValid;
  }

  static async fetchProductsFromCache(filters: ProductFilters): Promise<ProductResponse> {
    console.log("CACHE HIT");
    const query = db.product
      .offset(Number(filters.skip || 0))
      .limit(Number(filters?.limit || 10));

    if (filters.q) {
      query.filter((p) =>
        p.title.toLowerCase().includes(String(filters.q).toLowerCase())
      );
    }

    const data = await query.toArray();

    return Promise.resolve({
      products: data,
    });
  }
}

function addDays(date: Date, daysToAdd: number) {
  const millisecondsInADay = 24 * 60 * 60 * 1000;
  const newDate = new Date(date.getTime() + daysToAdd * millisecondsInADay);
  return newDate;
}