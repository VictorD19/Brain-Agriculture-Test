import { DashboardController } from "@controllers/DashboardController";
import { Router } from "express";

const router = Router();
router.get("/resumo", DashboardController.ObterResumoTotal);
export default router;
