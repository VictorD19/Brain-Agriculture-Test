// validacoes.test.ts

import {Validacoes} from '@utilidades/Validacoes';

describe('Funções de validação', () => {

  it('Deve validar um CPF corretamente',()=>{
    const cpfValido = '156.174.950-89';  
    const cpfInvalido = '156.174.950-90'; 
    expect(Validacoes.ValidarCPF(cpfValido)).toBe(true);
    expect(Validacoes.ValidarCPF(cpfInvalido)).toBe(false);
  })

  it('Deve validar um CNPJ corretamente',()=>{
    const cnpjValido = '80.004.331/0001-39';  
    const cnpjInvalido = '80.004.331/0001-80'; 
    expect(Validacoes.ValidarCNPJ(cnpjValido)).toBe(true);
    expect(Validacoes.ValidarCNPJ(cnpjInvalido)).toBe(false);
  })

  it('Deve validar se CPF ou CNPJ é valido',()=>{
    const cpfValido = '156.174.950-89';  
    const cnpjValido = '80.004.331/0001-39';  
    expect(Validacoes.ValidarCPFCNPJValido(cpfValido)).toBe(true);
    expect(Validacoes.ValidarCPFCNPJValido(cnpjValido)).toBe(true);
  })

  it('Deve validar que o CPF OU CNPJ é invalido',()=>{
    expect(Validacoes.ValidarCPFCNPJValido('8454874')).toBe(false);
  })
});
