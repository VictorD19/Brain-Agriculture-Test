
jest.mock("@repositorios/CulturaRepositorio");
jest.mock("@repositorios/FazendaRepositorio");

import { DashboardService } from "@servicos/DashboardService";
import { CulturaRepositorio } from "@repositorios/CulturaRepositorio";
import { FazendaRepositorio } from "@repositorios/FazendaRepositorio";
import { CulturaModel } from "@modelos/CulturaModel";
import { FazendaModel } from "@modelos/FazendaModel";

describe("DashboardService", () => {
  let dashboardService: DashboardService;
  let culturaRepositorioMock: jest.Mocked<CulturaRepositorio>;
  let fazendaRepositorioMock: jest.Mocked<FazendaRepositorio>;

  beforeEach(() => {
    const CulturaModelMock = CulturaModel as jest.Mocked<typeof CulturaModel>;
    const FazendaModelMock = FazendaModel as jest.Mocked<typeof FazendaModel>;

    culturaRepositorioMock = new CulturaRepositorio(
      CulturaModelMock
    ) as jest.Mocked<CulturaRepositorio>;
    fazendaRepositorioMock = new FazendaRepositorio(
      FazendaModelMock
    ) as jest.Mocked<FazendaRepositorio>;

    dashboardService = new DashboardService(
      culturaRepositorioMock,
      fazendaRepositorioMock
    );
  });

  it("Deve retornar resumo dos dados corretamente", async () => {
    // Arrange
    fazendaRepositorioMock.ContarTodos.mockResolvedValue(10);
    fazendaRepositorioMock.ObterAreaTotalDeTodasAsFazenda.mockResolvedValue(
      1000
    );
    fazendaRepositorioMock.ObterFazendasPorEstado.mockResolvedValue([
      { estado: "SP", quantidade: 5 },
      { estado: "MG", quantidade: 5 },
    ]);
    culturaRepositorioMock.ObterTotalDeFazendasPorCulturas.mockResolvedValue([
      { nome: "Soja", quantidade: 6 },
      { nome: "Milho", quantidade: 4 },
    ]);
    fazendaRepositorioMock.ObterTotalAgricultavelDeTodasAsFazendas.mockResolvedValue(
      800
    );
    fazendaRepositorioMock.ObterTotalVegetacaoDeTodasAsFazendas.mockResolvedValue(
      200
    );

    const resultado = await dashboardService.ObteResumoDados();

    expect(resultado.totalFazenda).toBe(10);
    expect(resultado.totalArea).toBe(1000);
    expect(resultado.fazendasPorEstado).toHaveLength(2);
    expect(resultado.fazendasPorCultura).toHaveLength(2);
    expect(resultado.usoSolo.totalAreaAgricultavel).toBe(800);
    expect(resultado.usoSolo.totalAreaVegetacao).toBe(200);
  });
});
