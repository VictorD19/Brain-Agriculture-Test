import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import ProdutoreRoute from "./routes/ProdutorRoute";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/produtor", ProdutoreRoute);
app.listen(process.env.PORT, () => {
  console.log("app ativoa");
});
