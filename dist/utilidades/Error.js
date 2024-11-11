"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicoException = void 0;
class ServicoException extends Error {
    constructor(message, codigo = 400, erroOperacional = true) {
        super(message);
        this.statusCode = codigo;
        this.isOperational = erroOperacional;
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this);
    }
}
exports.ServicoException = ServicoException;
