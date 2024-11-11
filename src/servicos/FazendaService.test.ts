// jest.mock("@modelos/ProdutorModel",()=>{
//   return {
//     ProdutorModel: jest.fn()
//   };
// })

// jest.mock("@modelos/FazendaModel",()=>{
//   return {
//     FazendaModel: jest.fn()  };
// })

// jest.mock("@modelos/CulturaModel",()=>{
//   return {
//     CulturaModel: jest.fn()}
// })

// jest.mock('@servicos/FazendaCulturaService', () => {
//   return {
//     FazendaCulturaService: jest.fn()}
// });

// jest.mock('@repositorios/FazendaRepositorio', () => {
//   return {
//     FazendaRepositorio: jest.fn()
//   };
// });

import { IFazendaAtributosCriacao, FazendaModel } from "@modelos/FazendaModel";
import { FazendaRepositorio } from "@repositorios/FazendaRepositorio";
import { FazendaService } from "@servicos/FazendaService";
import "sequelize";

jest.mock("@repositorios/FazendaRepositorio");
jest.mock("@modelos/FazendaModel");
jest.mock("@modelos/ProdutorModel", () => {
  return {
    ProdutorModel: jest.fn(),
  };
});

describe("Testes de Validação de Dados para Criação de Fazenda", () => {
  let fazendaService: FazendaService;
  let fazendaRepositorioMock: jest.Mocked<FazendaRepositorio>;

  beforeEach(() => {
    const FazendaModelMock = FazendaModel as jest.Mocked<typeof FazendaModel>;
    fazendaRepositorioMock = new FazendaRepositorio(
      FazendaModelMock
    ) as jest.Mocked<FazendaRepositorio>;
    fazendaService = new FazendaService(fazendaRepositorioMock);
  });

  it("Deve passar quando todos os dados forem válidos", () => {
    const fazendaValida: IFazendaAtributosCriacao = {
      ProdutorId: 1,
      Nome: "Fazenda São João",
      Estado: "São Paulo",
      Cidade: "Campinas",
      AreaAgricultavel: 500,
      AreaTotal: 1000,
      AreaVegetacao: 300,
    };

    expect(() =>
      fazendaService.ValidarDadosFazenda(fazendaValida)
    ).not.toThrow();
  });

  it("Deve lançar erro quando o nome da fazenda estiver faltando", () => {
    const fazendaSemNome: IFazendaAtributosCriacao = {
      ProdutorId: 1,
      Nome: "",
      Estado: "São Paulo",
      Cidade: "Campinas",
      AreaAgricultavel: 500,
      AreaTotal: 1000,
      AreaVegetacao: 300,
    };

    expect(() =>
      fazendaService.ValidarDadosFazenda(fazendaSemNome)
    ).toThrowError("Precisa informar um nome para sua fazenda");
  });

  it("Deve lançar erro quando o estado estiver faltando", () => {
    const fazendaSemEstado: IFazendaAtributosCriacao = {
      ProdutorId: 1,
      Nome: "Fazenda São João",
      Estado: "",
      Cidade: "Campinas",
      AreaAgricultavel: 500,
      AreaTotal: 1000,
      AreaVegetacao: 300,
    };

    expect(() =>
      fazendaService.ValidarDadosFazenda(fazendaSemEstado)
    ).toThrowError("Precisa informar o estado onde se encontra sua fazenda");
  });

  it("Deve lançar erro quando a cidade estiver faltando", () => {
    const fazendaSemCidade: IFazendaAtributosCriacao = {
      ProdutorId: 1,
      Nome: "Fazenda São João",
      Estado: "São Paulo",
      Cidade: "",
      AreaAgricultavel: 500,
      AreaTotal: 1000,
      AreaVegetacao: 300,
    };

    expect(() =>
      fazendaService.ValidarDadosFazenda(fazendaSemCidade)
    ).toThrowError("Precisa informar a cidade onde se encontra sua fazenda");
  });

  it("Deve lançar erro quando a área agricultável for zero", () => {
    const fazendaAreaAgricultavelZero: IFazendaAtributosCriacao = {
      ProdutorId: 1,
      Nome: "Fazenda São João",
      Estado: "São Paulo",
      Cidade: "Campinas",
      AreaAgricultavel: 0,
      AreaTotal: 1000,
      AreaVegetacao: 300,
    };

    expect(() =>
      fazendaService.ValidarDadosFazenda(fazendaAreaAgricultavelZero)
    ).toThrowError("Precisa informar a área agricultável");
  });

  it("Deve lançar erro quando a área total for zero", () => {
    const fazendaAreaTotalZero: IFazendaAtributosCriacao = {
      ProdutorId: 1,
      Nome: "Fazenda São João",
      Estado: "São Paulo",
      Cidade: "Campinas",
      AreaAgricultavel: 500,
      AreaTotal: 0,
      AreaVegetacao: 300,
    };

    expect(() =>
      fazendaService.ValidarDadosFazenda(fazendaAreaTotalZero)
    ).toThrowError("Precisa informar a área total da sua fazenda");
  });

  it("Deve lançar erro quando a área de vegetação for zero", () => {
    const fazendaAreaVegetacaoZero: IFazendaAtributosCriacao = {
      ProdutorId: 1,
      Nome: "Fazenda São João",
      Estado: "São Paulo",
      Cidade: "Campinas",
      AreaAgricultavel: 500,
      AreaTotal: 1000,
      AreaVegetacao: 0,
    };

    expect(() =>
      fazendaService.ValidarDadosFazenda(fazendaAreaVegetacaoZero)
    ).toThrowError("Precisa informar a área de vegetação");
  });

  it("Deve lançar erro quando a soma da área agricultável e área de vegetação for maior que a área total", () => {
    const fazendaAreaInvalida: IFazendaAtributosCriacao = {
      ProdutorId: 1,
      Nome: "Fazenda São João",
      Estado: "São Paulo",
      Cidade: "Campinas",
      AreaAgricultavel: 700,
      AreaTotal: 1000,
      AreaVegetacao: 400,
    };

    expect(() =>
      fazendaService.ValidarDadosFazenda(fazendaAreaInvalida)
    ).toThrowError(
      `A soma da área de vegetação e a área agricultável da fazenda 'Fazenda São João' não pode ser maior que a área total`
    );
  });
});
