"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FazendaModel = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("@configuracoes/sequelize");
class FazendaModel extends sequelize_1.Model {
}
exports.FazendaModel = FazendaModel;
FazendaModel.init({
    Id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    Nome: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    AreaAgricultavel: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    AreaTotal: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    Cidade: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    AreaVegetacao: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    Estado: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    ProdutorId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: "T_PRODUTOR", key: "Id" },
    },
}, {
    sequelize: sequelize_2.sequelize,
    tableName: "T_FAZENDA",
    modelName: "Fazenda",
});
