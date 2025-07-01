import IUser from "./user.interface";
import { User } from "./user.model";
import bcrypt from "bcrypt";
const createUserIntoDb = async (payload: IUser) => {
  try {
    const isExits = await User.findOne({ email: payload.email });
    if (isExits) {
      return "User already exits";
    }
    payload.password = await bcrypt.hash(payload.password, 10);
    const data = await User.create(payload);
    return data;
  } catch (err) {
    console.log(err);
  }
};
