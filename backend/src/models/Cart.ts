import mongoose, { Schema } from "mongoose";
import { CartType } from "../types";

const CartSchema = new Schema({
  sessionId: { type: String, required: true, unique: true },
  items: [
    {
      ProductId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },
      title: String,
      image: String,
      price: Number,
      quantity: Number,
    },
  ],
});

const Cart = mongoose.model<CartType>("Cart", CartSchema);

export default Cart;
