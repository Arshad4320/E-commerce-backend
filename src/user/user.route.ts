import express from "express";
import { userController } from "./user.controller";
import { verifyToken } from "../middleware/verifyToken";

const router = express.Router();

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);

router.get("/", verifyToken, userController.getAllUser);
router.get("/:id", verifyToken, userController.getSingleUer);
router.patch("/update-user/:id", verifyToken, userController.updateUser);
router.delete("/delete-user/:id", verifyToken, userController.deleteUser);

export const userRoute = router;
