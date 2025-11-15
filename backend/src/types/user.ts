import mongoose from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password?: string;
  auth0Id?: string;
  provider: "local" | "auth0";
  defaultAddress?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}
