import { useRef } from 'react';
import styles from './filters.module.css'
import useFilters from './store/filters';
import { ProductFilters } from './api/types';

const selectList = [
  "id",
  "title",
  "description",
  "images",
  "thumbnail",
  "price",
  "category",
  "discountPercentage",
  "rating",
  "stock",
  "tags",
  "brand",
  "sku",
  "weight",
  "dimensions",
  "warrantyInformation",
  "shippingInformation",
  "availabilityStatus",
  "reviews",
  "returnPolicy",
  "minimumOrderQuantity",
  "meta",
]

export default function Filters() {
  const { limit, q, select, skip } = useFilters()
  const setFilters = useFilters(state => state.setFilters)
  const formRef = useRef<HTMLFormElement | null>(null)

  function handleSubmit(event) {
    event.preventDefault()
    const data = new FormData(formRef?.current as HTMLFormElement)
    
    const filters: ProductFilters = {
      q: data.get('q')?.toString() || null,
      limit: data.get('limit')?.toString() || null,
      skip: data.get('skip')?.toString() || null,
      select: data.getAll('select') || null,
    }

    setFilters(filters)
  }
  console.log({select})
  return (
    <form ref={formRef} className={styles.filters} onSubmit={handleSubmit}>
      <fieldset>
        <label>Buscar por nome:</label>
        <input type="text" name="q" placeholder="Pesquisar" defaultValue={q} />
      </fieldset>

      <fieldset>
        <label>Limite:</label>
        <input type="number" defaultValue={limit} name="limit" placeholder="Limite 10" />
      </fieldset>

      <fieldset>
        <label>Skip:</label>
        <input type="number" defaultValue={skip} name="skip" placeholder="Skip 10" />
      </fieldset>

      <select name="select" multiple>
        {selectList.map(item => {
          const isSelected = select?.[0]?.split(',').includes(item)
          return <option value={item} selected={isSelected}>{item}</option>
        })}
      </select>
      
      <button type="submit">Filtrar</button>
    </form>

  );
}
