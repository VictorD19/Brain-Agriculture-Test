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
exports.FazendaCulturaRepositorio = void 0;
const RepositorioBase_1 = require("./base/RepositorioBase");
class FazendaCulturaRepositorio extends RepositorioBase_1.RepositorioBase {
    //#region Metodos Publicos
    VincularCulturaComFazenda(idCultura, idFazenda, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const vinculacao = yield this._modelo.create({ CulturaId: idCultura, FazendaId: idFazenda }, transaction ? { transaction } : undefined);
            yield vinculacao.save();
        });
    }
    RemoverFazendaCulturaPorFazendaId(idFazenda, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._modelo.destroy({
                where: { FazendaId: idFazenda },
                transaction: transaction,
            });
        });
    }
    ExisteVinculacao(idFazenda, idCultura) {
        return __awaiter(this, void 0, void 0, function* () {
            const existeVinculo = yield this._modelo.findOne({
                where: {
                    FazendaId: idFazenda,
                    CulturaId: idCultura,
                },
            });
            return existeVinculo != null;
        });
    }
}
exports.FazendaCulturaRepositorio = FazendaCulturaRepositorio;
