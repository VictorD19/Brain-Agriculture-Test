"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CulturaModel = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../configuracoes/sequelize");
class CulturaModel extends sequelize_1.Model {
}
exports.CulturaModel = CulturaModel;
CulturaModel.init({
    Id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    Nome: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, { sequelize: sequelize_2.sequelize, tableName: "T_CULTURA", modelName: "Cultura" });
