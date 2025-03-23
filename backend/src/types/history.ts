import { Types } from "mongoose";

export interface HistoryType {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  items: {
    productId: Types.ObjectId;
    title: string;
    category: string;
    image: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  addressId: Types.ObjectId;
  createdAt?: Date;
}
