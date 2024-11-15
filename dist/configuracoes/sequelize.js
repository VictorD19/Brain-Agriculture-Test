"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize(process.env.DB_NAME || "brain-agriculture", process.env.DB_USER || "postgres", process.env.DB_PASSWORD || "postgres", {
    host: process.env.HOST || "localhost",
    dialect: "postgres",
    port: Number(process.env.PORT_DATABASE) || 5433,
    logging: false,
    define: {
        freezeTableName: true,
    },
});
exports.sequelize = sequelize;
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield sequelize.sync({ alter: true });
    console.log("Banco inicializado com sucesso");
}))();
