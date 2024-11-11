import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import ProdutoreRoute from "@rotas/ProdutorRoute";
import CulturaRoute from "@rotas/CulturaRoute";
import DashboardRoute from "@rotas/DashboardRoute";
import "@configuracoes/sequelize";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/produtor", ProdutoreRoute);
app.use("/cultura", CulturaRoute);
app.use("/dashboard", DashboardRoute);

app.listen(process.env.PORT, () => {
  console.log("Aplicação ON");
});
