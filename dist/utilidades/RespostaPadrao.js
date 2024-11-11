"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RespostaPadrao = void 0;
class RespostaPadrao {
    constructor(data) {
        if (typeof data === "boolean" && !arguments[1] && !arguments[2]) {
            this.Sucesso = true;
            this.Mensagem = "";
            this.Data = data;
            return;
        }
        if (typeof data === "boolean" && arguments[1] != null && arguments[2]) {
            this.Sucesso = arguments[0];
            this.Mensagem = arguments[2];
            this.Data = arguments[1];
            return;
        }
        if (typeof data === "boolean" && arguments[1]) {
            this.Sucesso = arguments[0];
            this.Mensagem = arguments[1];
            this.Data = null;
            return;
        }
        if (typeof data === "string") {
            this.Sucesso = true;
            this.Mensagem = data;
            this.Data = null;
            return;
        }
        this.Sucesso = true;
        this.Mensagem = "";
        this.Data = data !== null && data !== void 0 ? data : null;
    }
}
exports.RespostaPadrao = RespostaPadrao;
