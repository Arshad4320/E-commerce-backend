import { User } from "../user/user.model";
import { IProduct } from "./product.interface";
import { Product } from "./product.model";

const createAllProductsIntoDb = async (payload: IProduct) => {
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

const getAllProductsIntoDb = async (query: any) => {
  try {
    const {
      search,
      category,
      minPrice,
      maxPrice,
      seller,
      page = 1,
      limit = 10,
    } = query;
    const filter: any = {};
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ];
    }
    if (category) {
      filter.category = category;
    }
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    if (seller) {
      filter.seller = seller;
    }
    const pageNum = parseInt(page as string) || 1;
    const limitNum = parseInt(limit as string) || 10;
    const skip = (pageNum - 1) * limitNum;
    const result = await Product.find(filter)
      .skip(skip)
      .limit(limitNum)
      .sort({ createdAt: -1 });
    const total = await Product.countDocuments(filter);
    return {
      meta: {
        total,
        page: pageNum,
        limit: limitNum,
      },
      data: result,
    };
  } catch (err) {
    console.error("Error in getAllProductsIntoDb:", err);
    throw err;
  }
};

const getSingleProductIntoDb = async (id: string) => {
  try {
    const result = await Product.findById(id);
    return result;
  } catch (err) {
    console.log(err);
  }
};
const updateProductIntoDb = async (id: string, payload: IProduct) => {
  try {
    const result = await Product.findByIdAndUpdate(id, payload, { new: true });
    return result;
  } catch (err) {
    console.log(err);
  }
};
const deleteProductIntoDb = async (id: string) => {
  try {
    const result = await Product.findByIdAndDelete(id);
    return result;
  } catch (err) {
    console.log(err);
  }
};
export const productServices = {
  createAllProductsIntoDb,
  getAllProductsIntoDb,
  getSingleProductIntoDb,
  updateProductIntoDb,
  deleteProductIntoDb,
};
