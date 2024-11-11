import { Router } from "express";

import {CulturaController} from "controladores/CulturaController";
const router: Router = Router();
router.get("/:id", CulturaController.BuscarPorCodigo);
router.post("/inserir", CulturaController.Inserir);
router.patch("/atualizar", CulturaController.Atualizar);
router.delete("/remover/:id", CulturaController.Remover);

export default router;
