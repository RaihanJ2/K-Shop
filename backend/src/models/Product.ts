import mongoose, { Schema } from "mongoose";
import { ProductType } from "../types";

const ProductSchema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  description: { type: String },
  category: { type: String, required: true },
});

const Product = mongoose.model<ProductType>("Product", ProductSchema);

export default Product;
