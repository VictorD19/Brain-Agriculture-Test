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
const ProdutorRepositorio_1 = require("@repositorios/ProdutorRepositorio");
const ProdutorModel_1 = require("modelos/ProdutorModel");
const Validacoes_1 = require("@utilidades/Validacoes");
const Error_1 = require("@utilidades/Error");
class ProdutorService {
    //#endregion
    //#region Construtores
    constructor() {
        this._repositorioProdutor = new ProdutorRepositorio_1.ProdutorRepositorio(ProdutorModel_1.ProdutorModel);
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
            if (!produtor)
                throw new Error_1.ServicoException("Produtor não encontrado", 404);
            //pesquisaFazedas e cultura
            return produtor;
        });
    }
    Criar(produtor) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Validacoes_1.Validacoes.ValidarCPFCNPJValido())
                throw new Error_1.ServicoException(`CPF ou CNPJ invalido`);
            yield this._repositorioProdutor.Inserir(produtor);
        });
    }
    Remover(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield this._repositorioProdutor.VerificarUsuarioExistentePorId(id)))
                throw new Error_1.ServicoException("Produtor não encontrado", 404);
            this._repositorioProdutor.Deletar(id);
        });
    }
    Atualizar(id, produtor) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield this._repositorioProdutor.VerificarUsuarioExistentePorId(id)))
                throw new Error_1.ServicoException("Produtor não encontrado", 404);
            this._repositorioProdutor.Atualizar(id, produtor);
        });
    }
}
exports.ProdutorService = ProdutorService;
