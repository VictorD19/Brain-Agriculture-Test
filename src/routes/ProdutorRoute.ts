import { Router } from "express";
import ProdutorController from "@controllers/ProdutorController";
const router: Router = Router();
router.get("/", ProdutorController.BuscarPorCodigo);
router.post("/criar", ProdutorController.Inserir);
router.patch("/atualizar", ProdutorController.Atualizar);
router.delete("/remover", ProdutorController.Remover);

export default router;
