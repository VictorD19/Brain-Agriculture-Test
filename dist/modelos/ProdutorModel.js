"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProdutorModel = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("@configuracoes/sequelize");
class ProdutorModel extends sequelize_1.Model {
}
exports.ProdutorModel = ProdutorModel;
ProdutorModel.init({
    Id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    CpfCnpj: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    Nome: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: sequelize_2.sequelize,
    modelName: "Produtor",
    tableName: "T_PRODUTOR",
});
