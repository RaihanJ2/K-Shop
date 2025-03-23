import { Types } from "mongoose";

export interface UserType extends Document {
  _id?: Types.ObjectId;
  username: string;
  email: string;
  password: string;
  defaultAddress?: Types.ObjectId;
}
