import { Request, Response } from "express";
import { userServices } from "./user.service";

const registerUser = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const result = await userServices.registerUserFromIntoDb(payload);
    res.json({
      success: true,
      message: "user created successfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};
const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await userServices.loginFromUserIntoDb({ email, password });
    res.json({
      success: true,
      message: "user login successfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};
const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const result = await userServices.updateUserFormIntoDb(id, payload);
    res.json({
      success: true,
      message: "user update successfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};
const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getUsersFormIntoDb();
    res.json({
      success: true,
      message: "all users retrieve",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};
const getSingleUer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await userServices.getSingleUserFromIntoDb(id);
    res.json({
      success: true,
      message: "user retrieve",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};
const deleteUser = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = userServices.deleteUserFromIntoDb(id);
    res.json({
      success: true,
      message: "user deleted successfully",
    });
  } catch (err) {
    console.log(err);
  }
};
export const userController = {
  registerUser,
  loginUser,
  updateUser,
  getAllUser,
  getSingleUer,
  deleteUser,
};
