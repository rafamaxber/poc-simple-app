import Dexie, { type EntityTable } from "dexie";
import { Product } from "../api/types";

export type ExpireAtDateType = string
export type ProductEntity = Product

export const db = new Dexie("ProductDatabase") as Dexie & {
  product: EntityTable<ProductEntity, "id">;
  productTableExpire: EntityTable<{ expireAt: ExpireAtDateType, id: number }, "id">;
};

// Schema declaration:
db.version(1).stores({
  product:
    "++id, title, description, category, price, discountPercentage, rating, stock, tags, brand, sku, weight, dimensions, warrantyInformation, shippingInformation, availabilityStatus, reviews, returnPolicy, minimumOrderQuantity, meta, images, thumbnail",
  productTableExpire: "++id, expireAt",
});

