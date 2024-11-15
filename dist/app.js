"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const ProdutorRoute_1 = __importDefault(require("./rotas/ProdutorRoute"));
const CulturaRoute_1 = __importDefault(require("./rotas/CulturaRoute"));
const DashboardRoute_1 = __importDefault(require("./rotas/DashboardRoute"));
const swaggerConfig_1 = require("./swaggerConfig");
require("./configuracoes/sequelize");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/produtor", ProdutorRoute_1.default);
app.use("/cultura", CulturaRoute_1.default);
app.use("/dashboard", DashboardRoute_1.default);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerConfig_1.swaggerSpec));
app.listen(process.env.PORT, () => {
    console.log("Aplicação ON");
});
