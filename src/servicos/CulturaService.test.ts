jest.mock("@repositorios/CulturaRepositorio", () => {
  return {
    CulturaRepositorio: jest.fn().mockImplementation(() => ({
      VerificarSeExistePorNome: jest.fn(),
      Inserir: jest.fn(),
      Atualizar: jest.fn(),
      Deletar: jest.fn(),
      BuscarPorCodigo: jest.fn(),
      BuscarTodos: jest.fn(),
      VerificarSeExistePorId: jest.fn(),
    })),
  };
});

import { CulturaService } from "@servicos/CulturaService";
import { CulturaRepositorio } from "@repositorios/CulturaRepositorio";
import { CulturaModel } from "@modelos/CulturaModel";

describe("CulturaService", () => {
  let culturaService: CulturaService;
  let culturaRepositorioMock: jest.Mocked<CulturaRepositorio>;

  beforeEach(() => {
    const CulturaModeloMock = CulturaModel as jest.Mocked<typeof CulturaModel>;
    culturaRepositorioMock = new CulturaRepositorio(
      CulturaModeloMock
    ) as jest.Mocked<CulturaRepositorio>;
    culturaService = new CulturaService(culturaRepositorioMock);
  });

  describe("Criar", () => {
    it("Deve criar uma nova cultura com sucesso", async () => {
      culturaRepositorioMock.VerificarSeExistePorNome.mockResolvedValue(false);
      await expect(
        culturaService.Criar({ Nome: "Milho" })
      ).resolves.not.toThrow();
      expect(culturaRepositorioMock.Inserir).toHaveBeenCalledWith(
        { Nome: "Milho" },
        undefined
      );
    });

    it("Deve lançar erro se o nome da cultura não for fornecido", async () => {
      await expect(culturaService.Criar({ Nome: "" })).rejects.toThrow(
        "Precisa informar um nome valido para sua cultura"
      );
    });

    it("Deve lançar erro se a cultura já existir", async () => {
      culturaRepositorioMock.VerificarSeExistePorNome.mockResolvedValue(true);
      await expect(culturaService.Criar({ Nome: "Soja" })).rejects.toThrow(
        "Cultura já existe"
      );
    });
  });

  describe("Atualizar", () => {
    it("Deve atualizar uma cultura com sucesso", async () => {
      await expect(
        culturaService.Atualizar({ Nome: "Milho", Id: 1 })
      ).resolves.not.toThrow();
      expect(culturaRepositorioMock.Atualizar).toHaveBeenCalledWith(
        1,
        { Nome: "Milho", Id: 1 },
        undefined
      );
    });

    it("Deve lançar erro se o nome não for fornecido", async () => {
      await expect(
        culturaService.Atualizar({ Nome: "", Id: 1 })
      ).rejects.toThrow("Precisa informar um nome valido para sua cultura");
    });

    it("Deve lançar erro se o Id não for fornecido", async () => {
      await expect(culturaService.Atualizar({ Nome: "Milho" })).rejects.toThrow(
        "Precisa informar o registro que deseja atualizar"
      );
    });
  });

  describe("Remover", () => {
    it("Deve remover uma cultura com sucesso", async () => {
      culturaRepositorioMock.VerificarSeExistePorId.mockResolvedValue(true);
      await expect(culturaService.Remover(1)).resolves.not.toThrow();
      expect(culturaRepositorioMock.Deletar).toHaveBeenCalledWith(1, undefined);
    });

    it("Deve lançar erro se a cultura não existir", async () => {
      culturaRepositorioMock.VerificarSeExistePorId.mockResolvedValue(false);
      await expect(culturaService.Remover(1)).rejects.toThrow(
        "A cultura que você esta tentado remover não existe"
      );
    });
  });

  describe("BuscarInformacoesPorCodigo", () => {
    it("Deve retornar informações da cultura", async () => {
      const culturaMock = { Id: 1, Nome: "Soja" } as CulturaModel;
      culturaRepositorioMock.BuscarPorCodigo.mockResolvedValue(culturaMock);

      const resultado = await culturaService.BuscarInformacoesPorCodigo(1);
      expect(resultado).toEqual(culturaMock);
      expect(culturaRepositorioMock.BuscarPorCodigo).toHaveBeenCalledWith(1);
    });

    it("Deve lançar erro se a cultura não existir", async () => {
      culturaRepositorioMock.BuscarPorCodigo.mockResolvedValue(null);
      await expect(
        culturaService.BuscarInformacoesPorCodigo(1)
      ).rejects.toThrow("A cultura que esta tentado consultar não existe");
    });
  });

  describe("ExisteCulturaPorId", () => {
    it("Deve retornar true se a cultura existir", async () => {
      culturaRepositorioMock.VerificarSeExistePorId.mockResolvedValue(true);
      const existe = await culturaService.ExisteCulturaPorId(1);
      expect(existe).toBe(true);
      expect(
        culturaRepositorioMock.VerificarSeExistePorId
      ).toHaveBeenCalledWith(1);
    });

    it("Deve retornar false se a cultura não existir", async () => {
      culturaRepositorioMock.VerificarSeExistePorId.mockResolvedValue(false);
      const existe = await culturaService.ExisteCulturaPorId(1);
      expect(existe).toBe(false);
    });
  });

  describe("ObterCulturas", () => {
    it("Deve retornar todas as culturas", async () => {
      const culturaMock = [
        { Id: 1, Nome: "Soja" },
        { Id: 2, Nome: "Milho" },
      ] as CulturaModel[];
      culturaRepositorioMock.BuscarTodos.mockResolvedValue(culturaMock);
      const culturas = await culturaService.ObterCulturas();
      expect(culturas).toEqual(culturaMock);
    });
  });
});
