import { Request, Response } from "express";
import { productServices } from "./product.service";

const createProduct = async (req: Request, res: Response) => {
  try {
    const files = req.files as Express.Multer.File[];
    const images = files.map((file) => file.filename);
    const payload = req.body;
    payload.images = images;
    const result = await productServices.createAllProductsIntoDb(payload);
    res.json({
      success: true,
      message: "product created successfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};
const getProducts = async (req: Request, res: Response) => {
  try {
    const result = await productServices.getAllProductsIntoDb(req.query);
    res.json({
      success: true,
      message: "all products is  retrieve",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const result = await productServices.getSingleProductIntoDb(req.params.id);
    res.json({
      success: true,
      message: "single product is retrieve",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};
const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const result = await productServices.updateProductIntoDb(id, payload);
    res.json({
      success: true,
      message: "product update successfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const result = await productServices.deleteProductIntoDb(req.params.id);
    res.json({
      success: true,
      message: "product deleted successfully",
      result,
    });
  } catch (err) {
    console.log(err);
  }
};
