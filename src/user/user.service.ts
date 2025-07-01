import jwt from "jsonwebtoken";
import IUser from "./user.interface";
import { User } from "./user.model";
import bcrypt from "bcrypt";
const jwtSecret = process.env.JWT_SECRET as string;
const registerUserFromIntoDb = async (payload: IUser) => {
  try {
    const isExits = await User.findOne({ email: payload.email });
    if (isExits) {
      return "user already exits";
    }
    payload.password = await bcrypt.hash(payload.password, 10);
    const data = await User.create(payload);
    return data;
  } catch (err) {
    console.log(err);
  }
};
const loginFromUserIntoDb = async (payload: {
  email: string;
  password: string;
}) => {
  try {
    const user = await User.findOne({ email: payload.email });
    if (!user) {
      return "user not found please create account or try again";
    }
    const match = await bcrypt.compare(user.password, payload.password);
    if (match) {
      return "wrong password,please try again";
    }
    const token = jwt.sign(
      {
        email: user.email,
        password: user.password,
        userId: user._id,
        role: user.role,
      },
      jwtSecret,
      { expiresIn: "30d" }
    );
    const result = await User.create({ user, token });
    return result;
  } catch (err) {
    console.log(err);
  }
};
const getUsersFormIntoDb = async () => {
  try {
    const result = await User.find();
    const buyer = await User.find({ role: "buyer" });

    const seller = await User.find({ role: "seller" });

    const admin = await User.find({ role: "admin" });

    return { result, buyer, seller, admin };
  } catch (err) {
    console.log(err);
  }
};
const getSingleUserFromIntoDb = async (id: string) => {
  try {
    const result = await User.findById(id);
    return result;
  } catch (err) {
    console.log(err);
  }
};
const updateUserFormIntoDb = async (id: string, payload: IUser) => {
  try {
    const result = await User.findByIdAndUpdate(id, payload, { new: true });
    return result;
  } catch (err) {
    console.log(err);
  }
};
const deleteUserFromIntoDb = async (id: string) => {
  try {
    const result = await User.findByIdAndDelete(id);
    return result;
  } catch (err) {
    console.log(err);
  }
};
export const userServices = {
  getUsersFormIntoDb,
  registerUserFromIntoDb,
  loginFromUserIntoDb,
  deleteUserFromIntoDb,
  updateUserFormIntoDb,
  getSingleUserFromIntoDb,
};
