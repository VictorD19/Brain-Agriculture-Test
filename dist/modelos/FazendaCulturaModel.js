"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FazendaCulturaModel = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("@configuracoes/sequelize");
const FazendaModel_1 = require("./FazendaModel");
const CulturaModel_1 = require("./CulturaModel");
class FazendaCulturaModel extends sequelize_1.Model {
}
exports.FazendaCulturaModel = FazendaCulturaModel;
FazendaCulturaModel.init({
    Id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    CulturaId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: { key: "Id", model: "T_CULTURA" },
    },
    FazendaId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: { key: "Id", model: "T_FAZENDA" },
    },
}, { sequelize: sequelize_2.sequelize, tableName: "T_FAZENDA_CULTURA", modelName: "FazendaCultura" });
FazendaModel_1.FazendaModel.belongsToMany(CulturaModel_1.CulturaModel, {
    through: FazendaCulturaModel,
    as: "CulturaModel",
    foreignKey: "FazendaId",
});
CulturaModel_1.CulturaModel.belongsToMany(FazendaModel_1.FazendaModel, {
    through: FazendaCulturaModel,
    as: "FazendaModel",
    foreignKey: "CulturaId",
});
