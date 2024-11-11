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
const FazendaService_1 = require("@servicos/FazendaService");
const ProdutorService_1 = require("@servicos/ProdutorService");
const Error_1 = require("@utilidades/Error");
const RespostaPadrao_1 = require("utilidades/RespostaPadrao");
class default_1 {
    static Inserir(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nome, cpf_cnpj, fazendas } = request.body;
                const produtorServico = new ProdutorService_1.ProdutorService();
                const produtor = yield produtorServico.BuscarProdutorPorCPF_CNPJ(cpf_cnpj);
                if (produtor)
                    response
                        .status(400)
                        .json(new RespostaPadrao_1.RespostaPadrao(false, "Usuario ja possui cadastro "));
                yield produtorServico.Criar({ CpfCnpj: cpf_cnpj, Nome: nome });
                const fazendaServico = new FazendaService_1.FazendaService();
                yield fazendaServico.CriarFazendas(fazendas);
                response.status(201).json(new RespostaPadrao_1.RespostaPadrao(true, "Usuario criado com sucesso"));
            }
            catch (error) {
                if (error instanceof Error_1.ServicoException) {
                    response
                        .status(error.statusCode)
                        .json(new RespostaPadrao_1.RespostaPadrao(false, error.message));
                    return;
                }
                response
                    .status(400)
                    .json({ error: "Ocorreu um erro ao tentar criar o usuario" });
            }
        });
    }
    static Atualizar(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, nome, cpf_cnpj, fazendas } = request.body;
                const produtorServico = new ProdutorService_1.ProdutorService();
                yield produtorServico.Atualizar(id, { Nome: nome, CpfCnpj: cpf_cnpj });
                const fazendaServico = new FazendaService_1.FazendaService();
                yield fazendaServico.AtualizarFazendas(id, fazendas);
                response.status(200).json({ message: "Registro atualizado com sucesso" });
            }
            catch (error) {
                if (error instanceof Error_1.ServicoException) {
                    response
                        .status(error.statusCode)
                        .json(new RespostaPadrao_1.RespostaPadrao(false, error.message));
                    return;
                }
                response
                    .status(400)
                    .json({ error: "Ocorreu um erro ao tentar atualizar o produtor" });
            }
        });
    }
    static Remover(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = request.params;
                const produtorServico = new ProdutorService_1.ProdutorService();
                yield produtorServico.Remover(Number(id));
                response
                    .status(200)
                    .json(new RespostaPadrao_1.RespostaPadrao(true, "Produtor removido com sucesso"));
            }
            catch (error) {
                if (error instanceof Error_1.ServicoException) {
                    response
                        .status(error.statusCode)
                        .json(new RespostaPadrao_1.RespostaPadrao(false, error.message));
                    return;
                }
                response
                    .status(400)
                    .json(new RespostaPadrao_1.RespostaPadrao(false, "Ocorreu um erro ao tentar remover o produtor"));
            }
        });
    }
    static BuscarPorCodigo(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = request.params;
                const produtorServico = new ProdutorService_1.ProdutorService();
                const produtor = yield produtorServico.ObterInformacoesPorId(Number(id));
                response.status(200).json(new RespostaPadrao_1.RespostaPadrao(produtor));
            }
            catch (error) {
                if (error instanceof Error_1.ServicoException) {
                    response
                        .status(error.statusCode)
                        .json(new RespostaPadrao_1.RespostaPadrao(false, error.message));
                    return;
                }
                response
                    .status(400)
                    .json(new RespostaPadrao_1.RespostaPadrao(false, "Ocorreu um erro ao tentar buscar o usuario"));
            }
        });
    }
}
exports.default = default_1;
