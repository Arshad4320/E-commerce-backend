import express, { Application, Request, Response } from "express";
import cors from "cors";

// import router from "./router/router";

const app: Application = express();

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).send({
    success: true,
    message: "e-commerce backend server Is Running",
  });
});

// app.use("/api/v1", router);

export default app;
