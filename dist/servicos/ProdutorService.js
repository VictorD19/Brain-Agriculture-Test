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
exports.ProdutorService = void 0;
const ProdutorRepositorio_1 = require("../repositorios/ProdutorRepositorio");
const ProdutorModel_1 = require("../modelos/ProdutorModel");
const Validacoes_1 = require("../utilidades/Validacoes");
const Error_1 = require("../utilidades/Error");
const FazendaCulturaService_1 = require("./FazendaCulturaService");
const FazendaService_1 = require("./FazendaService");
class ProdutorService {
    //#endregion
    //#region Construtores
    constructor(repositorioProdutor) {
        this._repositorioProdutor = repositorioProdutor || new ProdutorRepositorio_1.ProdutorRepositorio(ProdutorModel_1.ProdutorModel);
    }
    //#endregion
    //#region Metodos Publicos
    BuscarProdutorPorCPF_CNPJ(cpf_cnpj) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._repositorioProdutor.BuscarPorCPF_CNPJ(cpf_cnpj);
        });
    }
    ObterInformacoesPorId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const produtor = yield this._repositorioProdutor.BuscarPorCodigo(id);
            if (!produtor) {
                throw new Error_1.ServicoException("Usuário não encontrado", 404);
            }
            const servicoFazendas = new FazendaService_1.FazendaService();
            const fazendasDoProdutor = yield servicoFazendas.ObterFazendasDoProdutor(id);
            return {
                id: produtor.Id,
                nome: produtor.Nome,
                cpf_cnpj: produtor.CpfCnpj,
                fazendas: fazendasDoProdutor.map((fazenda) => {
                    var _a;
                    return ({
                        id: fazenda.Id,
                        nome: fazenda.Nome,
                        areaTotal: fazenda.AreaTotal,
                        areaAgricultavel: fazenda.AreaAgricultavel,
                        areaVegetacao: fazenda.AreaVegetacao,
                        estado: fazenda.Estado,
                        cidade: fazenda.Cidade,
                        culturas: (_a = fazenda === null || fazenda === void 0 ? void 0 : fazenda.CulturasVinculadas) === null || _a === void 0 ? void 0 : _a.map((cultura) => ({
                            id: cultura.Id,
                            nome: cultura.Nome,
                        })),
                    });
                }),
            };
        });
    }
    Criar(produtor, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Validacoes_1.Validacoes.ValidarCPFCNPJValido(produtor.CpfCnpj))
                throw new Error_1.ServicoException(`CPF ou CNPJ invalido`);
            return yield this._repositorioProdutor.Inserir(produtor, transaction);
        });
    }
    Remover(id, transacao) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield this._repositorioProdutor.VerificarUsuarioExistentePorId(id)))
                throw new Error_1.ServicoException("Produtor não encontrado", 404);
            const servicoFazendaCultura = new FazendaCulturaService_1.FazendaCulturaService();
            yield servicoFazendaCultura.RemoverPorProdutor(id, transacao);
            const servicoFazenda = new FazendaService_1.FazendaService();
            yield servicoFazenda.RemoverFazendasPorIdProdutor(id, transacao);
            this._repositorioProdutor.Deletar(id);
        });
    }
    Atualizar(id, produtor, transacao) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield this._repositorioProdutor.VerificarUsuarioExistentePorId(id)))
                throw new Error_1.ServicoException("Produtor não encontrado", 404);
            this._repositorioProdutor.Atualizar(id, produtor, transacao);
        });
    }
}
exports.ProdutorService = ProdutorService;
