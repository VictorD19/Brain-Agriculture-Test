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
exports.ProdutorRepositorio = void 0;
const CulturaModel_1 = require("@modelos/CulturaModel");
const FazendaModel_1 = require("@modelos/FazendaModel");
const RepositorioBase_1 = require("@repositorios/base/RepositorioBase");
class ProdutorRepositorio extends RepositorioBase_1.RepositorioBase {
    //#region  Metodos Publicos
    BuscarPorCPF_CNPJ(cpf_cnpj) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._modelo.findOne({
                where: {
                    CpfCnpj: cpf_cnpj,
                },
            });
        });
    }
    VerificarUsuarioExistentePorId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const modelo = yield this._modelo.findByPk(id);
            return modelo != null;
        });
    }
    ObterDetalhesProdutorPorId(idProdutor) {
        return __awaiter(this, void 0, void 0, function* () {
            const produtor = yield this._modelo.findOne({
                where: { Id: idProdutor },
                include: [
                    {
                        model: FazendaModel_1.FazendaModel,
                        include: [
                            {
                                model: CulturaModel_1.CulturaModel,
                                attributes: ["Id", "Nome"],
                                through: { attributes: [] },
                            },
                        ],
                        attributes: ["Id", "Nome"],
                    },
                ],
            });
            return produtor;
        });
    }
}
exports.ProdutorRepositorio = ProdutorRepositorio;
