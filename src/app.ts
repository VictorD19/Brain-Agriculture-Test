import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import swaggerUi from "swagger-ui-express";

import ProdutoreRoute from "@rotas/ProdutorRoute";
import CulturaRoute from "@rotas/CulturaRoute";
import DashboardRoute from "@rotas/DashboardRoute";
import { swaggerSpec } from "./swaggerConfig";
import "@configuracoes/sequelize";
import { iniciarConexao } from "@configuracoes/sequelize";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/produtor", ProdutoreRoute);
app.use("/cultura", CulturaRoute);
app.use("/dashboard", DashboardRoute);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const startServer = async () => {
  try {
    await iniciarConexao();
    app.listen(process.env.PORT, () => {
      console.log(`Servidor rodando na porta ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("Erro ao iniciar a aplicação:", error);
  }
};

startServer();
