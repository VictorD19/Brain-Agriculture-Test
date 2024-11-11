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
exports.RepositorioBase = void 0;
const sequelize_1 = require("sequelize");
class RepositorioBase {
    constructor(modelo) {
        this._modelo = modelo;
    }
    Inserir(item) {
        return __awaiter(this, void 0, void 0, function* () {
            let itemCriacao = yield this._modelo.create(item);
            yield itemCriacao.save();
            return itemCriacao;
        });
    }
    BuscarPorCodigo(codigo) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._modelo.findByPk(codigo);
        });
    }
    BuscarPorCodigos(codigos) {
        return __awaiter(this, void 0, void 0, function* () {
            const where = {
                ["Id"]: {
                    [sequelize_1.Op.in]: codigos,
                },
            };
            return yield this._modelo.findAll({ where });
        });
    }
    BuscarTodos() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._modelo.findAll();
        });
    }
    Deletar(Id) {
        return __awaiter(this, void 0, void 0, function* () {
            const where = { Id };
            return yield this._modelo.destroy({ where });
        });
    }
    Atualizar(id, item) {
        return __awaiter(this, void 0, void 0, function* () {
            const where = {
                Id: id,
            };
            return yield this._modelo.update(item, { where, returning: true });
        });
    }
    ContarTodos() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._modelo.count();
        });
    }
    BuscarPrimerRegistro() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._modelo.findOne();
        });
    }
}
exports.RepositorioBase = RepositorioBase;
