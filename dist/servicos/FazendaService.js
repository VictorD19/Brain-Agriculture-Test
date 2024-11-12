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
exports.FazendaService = void 0;
const FazendaRepositorio_1 = require("@repositorios/FazendaRepositorio");
const Error_1 = require("@utilidades/Error");
const FazendaModel_1 = require("@modelos/FazendaModel");
class FazendaService {
    //#endregion
    //#region Constructores
    constructor(repositorioFazenda) {
        this._repositorioFazenda = repositorioFazenda || new FazendaRepositorio_1.FazendaRepositorio(FazendaModel_1.FazendaModel);
    }
    //#endregion
    //#region Metodos Publicos
    CriarFazendas(idProdutor, fazendaCriar, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            this.ValidarDadosFazenda(fazendaCriar);
            const fazendaCriada = yield this._repositorioFazenda.Inserir(Object.assign(Object.assign({}, fazendaCriar), { ProdutorId: idProdutor }), transaction);
            return fazendaCriada.Id;
        });
    }
    RemoverFazendaNaoInclusas(idProdutor, fazendas, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const fazendasProdutor = yield this._repositorioFazenda.BuscarFazendasPorIDProdutor(idProdutor);
            if (fazendasProdutor != null && fazendasProdutor.length > 0) {
                const codigosFazendasManter = [];
                fazendas.forEach((fazenda) => {
                    if (fazenda.Id != null && (fazenda === null || fazenda === void 0 ? void 0 : fazenda.Id) > 0)
                        codigosFazendasManter.push(fazenda.Id);
                });
                const fazendasRemover = fazendasProdutor.filter((fazenda) => !codigosFazendasManter.includes(fazenda.Id));
                for (let i = 0; i < fazendasRemover.length; i++) {
                    const fazendaRemover = fazendasRemover[i];
                    yield this._repositorioFazenda.Deletar(fazendaRemover.Id, transaction);
                }
            }
        });
    }
    AtualizarFazendas(idProdutor, fazendaAtualizar, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            this.ValidarDadosFazenda(fazendaAtualizar);
            let fazenda;
            if (!fazendaAtualizar.Id || fazendaAtualizar.Id == 0)
                fazenda = yield this._repositorioFazenda.Inserir(Object.assign(Object.assign({}, fazendaAtualizar), { ProdutorId: idProdutor }), transaction);
            else {
                const [_, fazendaAtualizada] = yield this._repositorioFazenda.Atualizar((_a = fazendaAtualizar === null || fazendaAtualizar === void 0 ? void 0 : fazendaAtualizar.Id) !== null && _a !== void 0 ? _a : 0, Object.assign(Object.assign({}, fazendaAtualizar), { ProdutorId: idProdutor }), transaction);
                fazenda = fazendaAtualizada[0];
            }
            return fazenda.Id;
        });
    }
    ObterCodigosFazendaPorProdutor(idProdutor) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._repositorioFazenda.ObterCodigosFazendasPorProdutor(idProdutor);
        });
    }
    RemoverFazendasPorIdProdutor(idProduto, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._repositorioFazenda.RemoverFazendaPorIdProdutor(idProduto, transaction);
        });
    }
    ObterFazendasDoProdutor(idProdutor) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._repositorioFazenda.BuscarFazendasPorIDProdutor(idProdutor);
        });
    }
    //#endregion
    //#region  Metodos Auxiliares
    ValidarDadosFazenda(fazendaCriar) {
        if (!fazendaCriar.Nome)
            throw new Error_1.ServicoException("Precisa informar um nome para sua fazenda");
        if (!fazendaCriar.Estado)
            throw new Error_1.ServicoException("Precisa informar o estado onde se encontra sua fazenda");
        if (!fazendaCriar.Cidade)
            throw new Error_1.ServicoException("Precisa informar a cidade onde se encontra sua fazenda");
        if (fazendaCriar.AreaAgricultavel == 0)
            throw new Error_1.ServicoException("Precisa informar a área agricultável");
        if (fazendaCriar.AreaTotal == 0)
            throw new Error_1.ServicoException("Precisa informar a área total da sua fazenda");
        if (fazendaCriar.AreaVegetacao == 0)
            throw new Error_1.ServicoException("Precisa informar a área de vegetação");
        if (fazendaCriar.AreaVegetacao + fazendaCriar.AreaAgricultavel >
            fazendaCriar.AreaTotal)
            throw new Error_1.ServicoException(`A soma da área de vegetação e a área agricultável da fazenda '${fazendaCriar.Nome}' não pode ser maior que a área total`);
    }
}
exports.FazendaService = FazendaService;
