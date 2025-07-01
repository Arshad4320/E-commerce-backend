import jwt from "jsonwebtoken";
import IUser from "./user.interface";
import { User } from "./user.model";
import bcrypt from "bcrypt";
const jwtSecret = process.env.JWT_SECRET as string;
const registerUserFromIntoDb = async (payload: IUser) => {
  const isExits = await User.findOne({ email: payload.email });
  if (isExits) {
    return "user already exits";
  }
  payload.password = await bcrypt.hash(payload.password, 10);
  const data = await User.create(payload);
  return data;
};
const loginFromUserIntoDb = async (payload: {
  email: string;
  password: string;
}) => {
  const user = await User.findOne({ email: payload.email });
  if (!user) {
    return "user not found please create account or try again";
  }
  const match = await bcrypt.compare(user.password, payload.password);
  if (match) {
    return "wrong password,please try again";
  }
  const token = jwt.sign(
    { email: user.email, password: user.password, userId: user._id },
    jwtSecret,
    { expiresIn: "30d" }
  );
  const result = await User.create({ user, token });
  return result;
};
