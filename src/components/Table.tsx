import { useQuery } from "@tanstack/react-query";
import ProductApi from "./api/ProductApi";
import { ProductFilters } from "./api/types";
import styles from './table.module.css'
import useFilters from "./store/filters";

export default function Table() {
  const { limit, q, select, skip } = useFilters()
  const { data } = useProducts({ limit, q, select, skip })

  return (
    <div className={styles.containerTable}>
      {data?.products.map((product) => (
      <div className={styles.product} key={product.id}>
        <img src={product.thumbnail} alt={product.title} />
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <p className={styles.price}>{product.price}</p>
      </div>
    ))}
    </div>
  )
}

function useProducts(filters: ProductFilters = {}) {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => ProductApi.fetchProducts(filters),
  })
}