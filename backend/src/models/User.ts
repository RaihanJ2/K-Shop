import mongoose, { Schema } from "mongoose";
import { UserType } from "../types";

//User type

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    match: [
      /^(?=.{6,30}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._' ]+(?<![_.])$/,
      "Username invalid, it should contain 6-30 characters including alphanumeric letters, spaces, apostrophes, and be unique!",
    ],
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  defaultAddress: {
    type: Schema.Types.ObjectId,
    ref: "Address",
  },
});

const User = mongoose.model<UserType>("User", UserSchema);

export default User;
