import { useRef } from 'react';
import styles from './filters.module.css'
import { useProductFilters } from './store/filters';
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
  const { limit, q, select, skip, setFilters, resetFilters } = useProductFilters()
  const formRef = useRef<HTMLFormElement | null>(null)

  function handleSubmit(event) {
    event.preventDefault()
    const data = new FormData(formRef?.current as HTMLFormElement)
    
    const filters = {
      q: data.get('q')?.toString() as ProductFilters['q'],
      limit: data.get('limit')?.toString() as ProductFilters['limit'],
      skip: data.get('skip')?.toString() as ProductFilters['skip'],
      select: data.getAll('select') as ProductFilters['select'],
    }

    setFilters(filters)
  }
  
  function handleReset(e) {
    resetFilters()
  }
  
  return (
    <form ref={formRef} className={styles.filters} onSubmit={handleSubmit} onReset={handleReset}>
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
      <button type="reset">Resetar</button>
    </form>

  );
}
