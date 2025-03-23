import { Types } from "mongoose";
import { ProductType } from "./product";

export interface CartItem {
  ProductId: Pick<ProductType, "_id" | "title" | "price" | "image">; // Reuse Product type
  quantity: number;
}

export interface CartType {
  _id: Types.ObjectId;
  sessionId: string;
  items: CartItem[];
}
