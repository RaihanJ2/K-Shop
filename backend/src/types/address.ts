import { Types } from "mongoose";

export interface AddressType {
  _id?: Types.ObjectId;
  name: string;
  city?: string;
  street?: string;
  state?: string;
  zipcode?: string;
  phone?: string;
  user?: string;
  isDefault?: boolean;
}
