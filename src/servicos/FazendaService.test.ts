import { IFazendaAtributosCriacao, FazendaModel } from "@modelos/FazendaModel";
import { FazendaRepositorio } from "@repositorios/FazendaRepositorio";
import { FazendaService } from "@servicos/FazendaService";

jest.mock("@repositorios/FazendaRepositorio");
jest.mock("@configuracoes/sequelize", () => {
  return {
    serialize: jest.fn(),
  };
});
jest.mock("@modelos/FazendaModel", () => {
  return {
    FazendaModel: jest.fn(),
  };
});
jest.mock("@modelos/ProdutorModel", () => {
  return {
    ProdutorModel: jest.fn(),
  };
});
jest.mock("@modelos/CulturaModel", () => {
  return {
    CulturaModel: jest.fn(),
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

describe("Validação do serviço de fazenda", () => {
  let fazendaService: FazendaService;
  let fazendaRepositorioMock: jest.Mocked<FazendaRepositorio>;

  const mockFazenda: IFazendaAtributosCriacao = {
    ProdutorId: 1,
    Nome: "Fazenda Teste",
    Estado: "São Paulo",
    Cidade: "Campinas",
    AreaAgricultavel: 500,
    AreaTotal: 1000,
    AreaVegetacao: 300,
  };

  beforeEach(() => {
    const FazendaModelMock = FazendaModel as jest.Mocked<typeof FazendaModel>;
    fazendaRepositorioMock = new FazendaRepositorio(
      FazendaModelMock
    ) as jest.Mocked<FazendaRepositorio>;
    fazendaService = new FazendaService(fazendaRepositorioMock);
  });

  describe("CriarFazendas", () => {
    it("deve criar uma nova fazenda com sucesso", async () => {
      const mockFazendaCriada = { ...mockFazenda, Id: 1 } as FazendaModel;
      fazendaRepositorioMock.Inserir.mockResolvedValue(mockFazendaCriada);

      const resultado = await fazendaService.CriarFazendas(1, mockFazenda);

      expect(resultado).toBe(1);
      expect(fazendaRepositorioMock.Inserir).toHaveBeenCalledWith(
        expect.objectContaining(mockFazenda),
        undefined
      );
    });
    it("ira gera um execeção quando erro", async () => {
      const FazendaASerCriadamock = {
        Nome: "",
        Estado: "",
        Cidade: "",
        AreaAgricultavel: 0,
        AreaTotal: 0,
        AreaVegetacao: 0,
      } as FazendaModel;
      const idProdutor:number = 1;
      await expect(fazendaService.CriarFazendas(idProdutor,FazendaASerCriadamock)).rejects.toThrow()

    });
  });

  describe("AtualizarFazendas", () => {
    it("deve atualizar uma fazenda existente", async () => {
      const fazendaAtualizada = { ...mockFazenda, Id: 1 } as FazendaModel;
      fazendaRepositorioMock.Atualizar.mockResolvedValue([
        1,
        [fazendaAtualizada],
      ]);

      const resultado = await fazendaService.AtualizarFazendas(1, {
        ...mockFazenda,
        Id: 1,
      });

      expect(resultado).toBe(1);
      expect(fazendaRepositorioMock.Atualizar).toHaveBeenCalled();
    });

    it("deve criar nova fazenda quando Id não for fornecido", async () => {
      const mockFazendaCriada = { ...mockFazenda, Id: 1 } as FazendaModel;
      fazendaRepositorioMock.Inserir.mockResolvedValue(mockFazendaCriada);
      const idProdutor = 1;
      const resultado = await fazendaService.AtualizarFazendas(idProdutor, {
        ...mockFazenda,
        Id: 0,
      });

      expect(resultado).toBe(1);
      expect(fazendaRepositorioMock.Inserir).toHaveBeenCalled();
    });
  });

  describe('RemoverFazendaNaoInclusas', () => {
    it('deve remover fazendas que não estão na lista', async () => {
      const fazendasExistentes= [{...mockFazenda,Id: 2},{...mockFazenda,Id:1 }] as FazendaModel[];

      fazendaRepositorioMock.BuscarFazendasPorIDProdutor.mockResolvedValue(fazendasExistentes);
      fazendaRepositorioMock.Deletar.mockResolvedValue(null);

      await fazendaService.RemoverFazendaNaoInclusas(1, [{...mockFazenda,Id: 1}]);

      expect(fazendaRepositorioMock.Deletar).toHaveBeenCalledWith(2, undefined);
    });
  });

  describe('ObterCodigosFazendaPorProdutor', () => {
    it('deve retornar os IDs das fazendas do produtor', async () => {
      fazendaRepositorioMock.ObterCodigosFazendasPorProdutor.mockResolvedValue([1, 2, 3]);

      const ids = await fazendaService.ObterCodigosFazendaPorProdutor(1);

      expect(ids).toEqual([1, 2, 3]);
    });
  });

  describe('RemoverFazendasPorIdProdutor', () => {
    it('deve remover todas as fazendas de um produtor', async () => {
      fazendaRepositorioMock.RemoverFazendaPorIdProdutor.mockResolvedValue();

      await fazendaService.RemoverFazendasPorIdProdutor(1);

      expect(fazendaRepositorioMock.RemoverFazendaPorIdProdutor).toHaveBeenCalledWith(1, undefined);
    });
  });
});
