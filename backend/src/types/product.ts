import { Types } from "mongoose";

export interface ProductType {
  _id: Types.ObjectId;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}
