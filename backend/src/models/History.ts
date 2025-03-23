import mongoose, { Schema } from "mongoose";
import { HistoryType } from "../types";

const HistorySchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
      title: {
        type: String,
        ref: "Product",
      },
      category: {
        type: String,
        ref: "Product",
      },
      image: {
        type: String,
        ref: "Product",
      },
      quantity: {
        type: Number,
      },
      price: {
        type: Number,
      },
    },
  ],
  totalAmount: {
    type: Number,
  },
  addressId: {
    type: Schema.Types.ObjectId,
    ref: "Address",
  },
  createdAt: { type: Date, default: Date.now },
});

const History = mongoose.model<HistoryType>("History", HistorySchema);

export default History;
