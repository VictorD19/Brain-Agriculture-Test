import { ProdutorController } from "@controllers/ProdutorController";
import { Router } from "express";
const router: Router = Router();
router.get("/:id", ProdutorController.BuscarPorCodigo);
router.post("/inserir", ProdutorController.Inserir);
router.patch("/atualizar", ProdutorController.Atualizar);
router.delete("/remover/:id", ProdutorController.Remover);

export default router;
