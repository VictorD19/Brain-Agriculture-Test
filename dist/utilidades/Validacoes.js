"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validacoes = void 0;
class Validacoes {
    //#region  Metodos Publicos
    static ValidarCPF(cpf) {
        cpf = this.RemoverNaoNumeros(cpf);
        let soma = 0;
        let resultado = 0;
        let numeros = "";
        let digitos = "";
        let digitosIguais = 1;
        if (cpf.length < 11) {
            return false;
        }
        for (let i = 0; i < cpf.length - 1; i++) {
            if (cpf.charAt(i) !== cpf.charAt(i + 1)) {
                digitosIguais = 0;
                break;
            }
        }
        if (digitosIguais === 0) {
            numeros = cpf.substring(0, 9);
            digitos = cpf.substring(9);
            soma = 0;
            for (let i = 10; i > 1; i--) {
                soma += parseInt(numeros.charAt(10 - i), 10) * i;
            }
            resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
            if (resultado !== parseInt(digitos.charAt(0), 10)) {
                return false;
            }
            numeros = cpf.substring(0, 10);
            soma = 0;
            for (let i = 11; i > 1; i--) {
                soma += parseInt(numeros.charAt(11 - i), 10) * i;
            }
            resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
            if (resultado !== parseInt(digitos.charAt(1), 10)) {
                return false;
            }
            return true;
        }
        return false;
    }
    static ValidarCNPJ(cnpj) {
        cnpj = this.RemoverNaoNumeros(cnpj);
        let soma = 0;
        let resultado = 0;
        let pos = 0;
        let tamanho = 0;
        let digitosIguais = 1;
        let numeros = "";
        let digitos = "";
        if (cnpj.length !== 14) {
            return false;
        }
        for (let i = 0; i < cnpj.length - 1; i++) {
            if (cnpj.charAt(i) !== cnpj.charAt(i + 1)) {
                digitosIguais = 0;
                break;
            }
        }
        if (digitosIguais === 0) {
            tamanho = cnpj.length - 2;
            numeros = cnpj.substring(0, tamanho);
            digitos = cnpj.substring(tamanho);
            soma = 0;
            pos = tamanho - 7;
            for (let i = tamanho; i >= 1; i--) {
                soma += parseInt(numeros.charAt(tamanho - i), 10) * pos--;
                if (pos < 2) {
                    pos = 9;
                }
            }
            resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
            if (resultado !== parseInt(digitos.charAt(0), 10)) {
                return false;
            }
            tamanho = tamanho + 1;
            numeros = cnpj.substring(0, tamanho);
            soma = 0;
            pos = tamanho - 7;
            for (let i = tamanho; i >= 1; i--) {
                soma += parseInt(numeros.charAt(tamanho - i), 10) * pos--;
                if (pos < 2) {
                    pos = 9;
                }
            }
            resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
            if (resultado !== parseInt(digitos.charAt(1), 10)) {
                return false;
            }
            return true;
        }
        return false;
    }
    static ValidarCPFCNPJValido() {
        return true;
    }
    //#endregion
    //#region Metodos Privados
    static RemoverNaoNumeros(valor) {
        return valor.replace(/\D/g, "");
    }
}
exports.Validacoes = Validacoes;
