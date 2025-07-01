import mongoose from "mongoose";
import app from "./app";
import dotenv from "dotenv";
const startServer = async () => {
  dotenv.config();
  const port = process.env.PORT || 5000;
  const database = process.env.MONGODB_URL as string;

  try {
    await mongoose.connect(database);
    app.listen(port, () => {
      console.log(`✅ e-commerce server is connected on port ${port} 🔥`);
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

startServer();
