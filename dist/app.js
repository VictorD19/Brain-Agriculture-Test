"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const ProdutorRoute_1 = __importDefault(require("./rotas/ProdutorRoute"));
require("@configuracoes/sequelize");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/produtor", ProdutorRoute_1.default);
app.listen(process.env.PORT, () => {
    console.log("Aplicação ON");
});
