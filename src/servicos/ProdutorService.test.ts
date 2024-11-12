jest.mock("@utilidades/Validacoes", () => {
  return {
    Validacoes: {
      ValidarCPFCNPJValido: jest.fn(),
    },
  };
});
jest.mock("@repositorios/ProdutorRepositorio", () => {
  return {
    ProdutorRepositorio: jest.fn().mockImplementation(() => ({
      VerificarUsuarioExistentePorId: jest.fn(),
      Atualizar: jest.fn(),
      Inserir: jest.fn(),
      Deletar: jest.fn(),
      BuscarPorCodigo: jest.fn(),
      BuscarPorCPF_CNPJ: jest.fn(),
    })),
  };
});

jest.mock("@servicos/FazendaCulturaService", () => {
  return {
    FazendaCulturaService: jest.fn().mockImplementation(() => ({
      RemoverPorProdutor: jest.fn(),
    })),
  };
});

jest.mock("@servicos/FazendaService", () => {
  return {
    FazendaService: jest.fn().mockImplementation(() => ({
      RemoverFazendasPorIdProdutor: jest.fn(),
    })),
  };
});

import { ProdutorService } from "@servicos/ProdutorService";
import { ProdutorRepositorio } from "@repositorios/ProdutorRepositorio";
import { FazendaService } from "@servicos/FazendaService";
import { FazendaCulturaService } from "@servicos/FazendaCulturaService";
import { Validacoes } from "@utilidades/Validacoes";
import { ProdutorModel } from "@modelos/ProdutorModel";

describe("ProdutorService", () => {
  let produtorService: ProdutorService;
  let produtorRepositorioMock: jest.Mocked<ProdutorRepositorio>;
  let fazendaServiceMock: jest.Mocked<FazendaService>;
  let fazendaCulturaServiceMock: jest.Mocked<FazendaCulturaService>;

  beforeEach(() => {
    const ProdutorModelMock = ProdutorModel as jest.Mocked<
      typeof ProdutorModel
    >;
    produtorRepositorioMock = new ProdutorRepositorio(
      ProdutorModelMock
    ) as jest.Mocked<ProdutorRepositorio>;
    fazendaServiceMock = new FazendaService() as jest.Mocked<FazendaService>;
    fazendaCulturaServiceMock =
      new FazendaCulturaService() as jest.Mocked<FazendaCulturaService>;
    produtorService = new ProdutorService(
      produtorRepositorioMock,
      fazendaCulturaServiceMock,
      fazendaServiceMock
    );
  });

  describe("BuscarProdutorPorCPF_CNPJ", () => {
    it("Deve retornar um produtor quando encontrar", async () => {
      const produtorMock = {
        Id: 1,
        Nome: "Produtor Teste",
        CpfCnpj: "12345678901",
      } as ProdutorModel;
      produtorRepositorioMock.BuscarPorCPF_CNPJ.mockResolvedValue(produtorMock);

      const resultado = await produtorService.BuscarProdutorPorCPF_CNPJ(
        "12345678901"
      );
      expect(resultado).toEqual(produtorMock);
      expect(produtorRepositorioMock.BuscarPorCPF_CNPJ).toHaveBeenCalledWith(
        "12345678901"
      );
    });

    it("Deve retornar null quando não encontrar um produtor", async () => {
      produtorRepositorioMock.BuscarPorCPF_CNPJ.mockResolvedValue(null);

      const resultado = await produtorService.BuscarProdutorPorCPF_CNPJ(
        "12345678901"
      );
      expect(resultado).toBeNull();
    });
  });

  describe("Criar", () => {
    it("Deve criar um produtor com sucesso", async () => {
      (Validacoes.ValidarCPFCNPJValido as jest.Mock).mockReturnValue(true);
      const produtorMock = {
        Id: 1,
        Nome: "Produtor Teste",
        CpfCnpj: "12345678901",
      } as ProdutorModel;
      produtorRepositorioMock.Inserir.mockResolvedValue(produtorMock);

      const resultado = await produtorService.Criar({
        Nome: "Produtor Teste",
        CpfCnpj: "12345678901",
      });
      expect(resultado).toEqual(produtorMock);
      expect(produtorRepositorioMock.Inserir).toHaveBeenCalled();
    });

    it("Deve lançar erro para CPF/CNPJ inválido", async () => {
      (Validacoes.ValidarCPFCNPJValido as jest.Mock).mockReturnValue(false);

      await expect(
        produtorService.Criar({ Nome: "Produtor Teste", CpfCnpj: "123" })
      ).rejects.toThrow("CPF ou CNPJ invalido");
    });
  });

  describe("Remover", () => {
    it("Deve remover um produtor com sucesso", async () => {
      produtorRepositorioMock.VerificarUsuarioExistentePorId.mockResolvedValue(
        true
      );
      await fazendaCulturaServiceMock.RemoverPorProdutor.mockResolvedValue(
        undefined
      );
      await fazendaServiceMock.RemoverFazendasPorIdProdutor.mockResolvedValue(
        undefined
      );
      produtorRepositorioMock.Deletar.mockResolvedValue(null);

      await expect(produtorService.Remover(1)).resolves.not.toThrow();

      expect(fazendaCulturaServiceMock.RemoverPorProdutor).toHaveBeenCalledWith(
        1,
        undefined
      );
      expect(
        fazendaServiceMock.RemoverFazendasPorIdProdutor
      ).toHaveBeenCalledWith(1, undefined);
      expect(produtorRepositorioMock.Deletar).toHaveBeenCalledWith(1);
    });

    it("Deve lançar erro se o produtor não existir", async () => {
      produtorRepositorioMock.VerificarUsuarioExistentePorId.mockResolvedValue(
        false
      );

      await expect(produtorService.Remover(1)).rejects.toThrow(
        "Produtor não encontrado"
      );
    });
  });

  describe("Atualizar", () => {
    it("Deve atualizar um produtor com sucesso", async () => {
      produtorRepositorioMock.VerificarUsuarioExistentePorId.mockResolvedValue(
        true
      );
      produtorRepositorioMock.Atualizar.mockResolvedValue([1, []]);

      await expect(
        produtorService.Atualizar(1, {
          Nome: "Produtor Atualizado",
          CpfCnpj: "12345678901",
        })
      ).resolves.not.toThrow();

      expect(produtorRepositorioMock.Atualizar).toHaveBeenCalledWith(
        1,
        { Nome: "Produtor Atualizado", CpfCnpj: "12345678901" },
        undefined
      );
    });

    it("Deve lançar erro se o produtor não existir", async () => {
      produtorRepositorioMock.VerificarUsuarioExistentePorId.mockResolvedValue(
        false
      );

      await expect(
        produtorService.Atualizar(1, {
          Nome: "Produtor Atualizado",
          CpfCnpj: "12345678901",
        })
      ).rejects.toThrow("Produtor não encontrado");
    });
  });
});
