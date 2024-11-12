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
exports.FazendaRepositorio = void 0;
const RepositorioBase_1 = require("./base/RepositorioBase");
const CulturaModel_1 = require("../modelos/CulturaModel");
const sequelize_1 = require("../configuracoes/sequelize");
class FazendaRepositorio extends RepositorioBase_1.RepositorioBase {
    //#region Metodos Publicos
    BuscarFazendasPorIDProdutor(idProdutor) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._modelo.findAll({
                where: {
                    ProdutorId: idProdutor,
                },
                include: {
                    model: CulturaModel_1.CulturaModel,
                    as: "CulturasVinculadas",
                    attributes: ["Id", "Nome"],
                },
            });
        });
    }
    RemoverFazendaPorIdProdutor(idProdutor, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._modelo.destroy({
                where: { ProdutorId: idProdutor },
                transaction: transaction,
            });
        });
    }
    ObterCodigosFazendasPorProdutor(idProdutor) {
        return __awaiter(this, void 0, void 0, function* () {
            const fazendaCodigos = yield this._modelo.findAll({
                attributes: ["Id"],
                where: {
                    ProdutorId: idProdutor,
                },
            });
            return fazendaCodigos.map((fazenda) => fazenda.Id);
        });
    }
    ObterAreaTotalDeTodasAsFazenda() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this._modelo.sum("AreaTotal")) || 0;
        });
    }
    ObterAreaTotalDeTodasAsFazendaPorProdutor(idProdutor) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._modelo.sum("AreaTotal", {
                where: { ProdutorId: idProdutor },
            });
        });
    }
    ContarTodasAsFazendasPorProdutor(idProdutor) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._modelo.count({
                where: { ProdutorId: idProdutor },
            });
        });
    }
    ObterFazendasPorEstado() {
        return __awaiter(this, void 0, void 0, function* () {
            const fazendasAgrupadas = (yield this._modelo.findAll({
                attributes: [
                    "Estado",
                    [sequelize_1.sequelize.fn("COUNT", sequelize_1.sequelize.col("Id")), "quantidade"],
                ],
                group: ["Estado"],
            }));
            const resultado = yield fazendasAgrupadas.map((fazenda) => ({
                estado: fazenda.Estado,
                quantidade: parseInt(fazenda.get("quantidade"), 10),
            }));
            return resultado;
        });
    }
    ObterFazendasPorEstadoEProdutor(idProdutor) {
        return __awaiter(this, void 0, void 0, function* () {
            const fazendasAgrupadas = (yield this._modelo.findAll({
                attributes: [
                    "estado",
                    [sequelize_1.sequelize.fn("COUNT", sequelize_1.sequelize.col("Id")), "quantidade"],
                ],
                where: {
                    ProdutorId: idProdutor
                },
                group: ["estado"],
            }));
            const resultado = fazendasAgrupadas.map((fazenda) => ({
                estado: fazenda.Estado,
                quantidade: parseInt(fazenda.get("quantidade"), 10),
            }));
            return resultado;
        });
    }
    ObterTotalAgricultavelDeTodasAsFazendas() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this._modelo.sum("AreaAgricultavel")) || 0;
        });
    }
    ObterTotalAgricultavelDeTodasAsFazendasDoProdutor(idProductor) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this._modelo.sum("AreaAgricultavel", { where: { ProdutorId: idProductor } })) || 0;
        });
    }
    ObterTotalVegetacaoDeTodasAsFazendas() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this._modelo.sum("AreaVegetacao")) || 0;
        });
    }
    ObterTotalVegetacaoDeTodasAsFazendasDoProdutor(idProductor) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._modelo.sum("AreaVegetacao", { where: { ProdutorId: idProductor } });
        });
    }
}
exports.FazendaRepositorio = FazendaRepositorio;
