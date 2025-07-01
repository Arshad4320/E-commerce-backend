import { model, Schema } from "mongoose";
import IUser from "./user.interface";

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    phone: {
      type: String,
      required: [true, "phone is required"],
    },
    address: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "seller", "buyer"],
    },
    avatar: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
export const User = model<IUser>("User", userSchema);
