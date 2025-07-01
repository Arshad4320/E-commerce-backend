import { Types } from "mongoose";

export interface IProduct {
  title: string;
  price: number;
  description: string;
  stock: number;
  category: string;
  image: string;
  seller: Types.ObjectId;
}
