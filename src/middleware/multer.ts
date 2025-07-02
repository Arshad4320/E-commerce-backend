// src/middleware/multer.ts
import { Request } from "express";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req: Request, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req: Request, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

export const upload = multer({ storage });
