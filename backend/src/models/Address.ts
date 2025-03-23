import mongoose, { Schema } from "mongoose";
import { AddressType } from "../types";

const AddressSchema = new Schema({
  name: { type: String, required: true },
  city: { type: String },
  street: { type: String },
  state: { type: String },
  zipcode: { type: String },
  phone: { type: String },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  isDefault: { type: Boolean, default: false },
});

const Address = mongoose.model<AddressType>("Address", AddressSchema);

export default Address;
