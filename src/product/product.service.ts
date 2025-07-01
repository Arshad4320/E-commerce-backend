import { User } from "../user/user.model";
import { IProduct } from "./product.interface";
import { Product } from "./product.model";

const createProduct = async (payload: IProduct) => {
  try {
    const seller = await User.findOne({ role: "seller" });
    if (!seller) {
      return "you are not seller";
    }
    payload.seller = seller._id;
    const result = await Product.create(payload);
    return result;
  } catch (err) {
    console.log(err);
  }
};
