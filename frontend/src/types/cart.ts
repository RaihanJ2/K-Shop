import { ProductType } from "./product";

export interface CartItem {
  ProductId: Pick<
    ProductType,
    "_id" | "title" | "category" | "price" | "image"
  >;
  quantity: number;
}

export interface CartType {
  _id: string;
  sessionId: string;
  items: CartItem[];
}
