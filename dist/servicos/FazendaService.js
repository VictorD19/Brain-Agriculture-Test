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
const FazendaCulturaRepositorio_1 = require("@repositorios/FazendaCulturaRepositorio");
const FazendaRepositorio_1 = require("@repositorios/FazendaRepositorio");
const Error_1 = require("@utilidades/Error");
const FazendaCulturaModel_1 = require("modelos/FazendaCulturaModel");
const FazendaModel_1 = require("modelos/FazendaModel");
class FazendaService {
    //#endregion
    //#region Constructores
    constructor() {
        this._repositorioFazenda = new FazendaRepositorio_1.FazendaRepositorio(FazendaModel_1.FazendaModel);
    }
    //#endregion
    //#region Metodos Publicos
    CriarFazendas(fazendas) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            for (let i = 0; i < fazendas.length; i++) {
                const fazendaCriar = fazendas[i];
                this.ValidarDadosFazenda(fazendaCriar);
                const fazendaCriada = yield this._repositorioFazenda.Inserir(fazendaCriar);
                if (fazendaCriar.Culturas != null && fazendaCriar.Culturas.length > 0) {
                    const repositorioFazendaCultura = new FazendaCulturaRepositorio_1.FazendaCulturaRepositorio(FazendaCulturaModel_1.FazendaCulturaModel);
                    for (let i = 0; i < ((_b = (_a = fazendaCriar === null || fazendaCriar === void 0 ? void 0 : fazendaCriar.Culturas) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0); i++) {
                        yield repositorioFazendaCultura.VincularCulturaComFazenda(fazendaCriar.Culturas[i], fazendaCriada.Id);
                    }
                }
            }
        });
    }
    AtualizarFazendas(idProdutor, fazendas) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            const fazendasProdutor = yield this._repositorioFazenda.BuscarFazendasPorIDProdutor(idProdutor);
            if (fazendasProdutor != null && fazendasProdutor.length > 0) {
                const codigosFazendasManter = [];
                fazendas.forEach(fazenda => {
                    if (fazenda.Id != null && (fazenda === null || fazenda === void 0 ? void 0 : fazenda.Id) > 0)
                        codigosFazendasManter.push(fazenda.Id);
                });
                const fazendasRemover = fazendasProdutor.filter(fazenda => !codigosFazendasManter.includes(fazenda.Id));
                for (let i = 0; i < fazendasRemover.length; i++) {
                    const fazendaRemover = fazendasRemover[i];
                    yield this._repositorioFazenda.Deletar(fazendaRemover.Id);
                }
            }
            for (let i = 0; i < fazendas.length; i++) {
                const fazendaAtualizar = fazendas[i];
                this.ValidarDadosFazenda(fazendaAtualizar);
                const [_, fazendaAtualizada] = yield this._repositorioFazenda.Atualizar((_a = fazendaAtualizar === null || fazendaAtualizar === void 0 ? void 0 : fazendaAtualizar.Id) !== null && _a !== void 0 ? _a : 0, fazendaAtualizar);
                if (fazendaAtualizar.Culturas != null && fazendaAtualizar.Culturas.length > 0) {
                    const repositorioFazendaCultura = new FazendaCulturaRepositorio_1.FazendaCulturaRepositorio(FazendaCulturaModel_1.FazendaCulturaModel);
                    for (let i = 0; i < ((_c = (_b = fazendaAtualizar === null || fazendaAtualizar === void 0 ? void 0 : fazendaAtualizar.Culturas) === null || _b === void 0 ? void 0 : _b.length) !== null && _c !== void 0 ? _c : 0); i++) {
                        yield repositorioFazendaCultura.VincularCulturaComFazenda(fazendaAtualizar.Culturas[i], fazendaAtualizada[0].Id);
                    }
                }
            }
        });
    }
    //#endregion
    //#region  Metodos Privados
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
            throw new Error_1.ServicoException("A soma da área de vegetação e a área agricultavel não pode ser maior que a área total");
    }
}
exports.FazendaService = FazendaService;
