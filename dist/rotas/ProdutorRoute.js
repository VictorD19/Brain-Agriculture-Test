"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProdutorController_1 = __importDefault(require("@controllers/ProdutorController"));
const router = (0, express_1.Router)();
router.get("/:id", ProdutorController_1.default.BuscarPorCodigo);
router.post("/inserir", ProdutorController_1.default.Inserir);
router.patch("/atualizar", ProdutorController_1.default.Atualizar);
router.delete("/remover/:id", ProdutorController_1.default.Remover);
exports.default = router;
