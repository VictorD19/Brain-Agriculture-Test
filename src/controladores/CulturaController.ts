import { sequelize } from "@configuracoes/sequelize";
import { CulturaService } from "@servicos/CulturaService";
import { ServicoException } from "@utilidades/Error";
import { RespostaPadrao } from "@utilidades/RespostaPadrao";
import { Request, Response } from "express";

export  class CulturaController {
  //#region Metodos Publicos
  static async Inserir(request: Request, response: Response): Promise<void> {
    const transacao = await sequelize.transaction();
    try {
      const { Nome } = request.body;
      const servicoCultura = new CulturaService();
      await servicoCultura.Criar({ Nome: Nome }, transacao);
      await transacao.commit();
      response
        .status(201)
        .json(new RespostaPadrao(true, "Cultura criada com sucesso"));
    } catch (error) {
      await transacao.rollback();
      if (error instanceof ServicoException) {
        response
          .status(error.statusCode)
          .json(new RespostaPadrao(false, error.message));
        return;
      }
      response
        .status(400)
        .json({ error: "Ocorreu um erro ao tentar criar cultura" });
    }
  }

  static async Atualizar(request: Request, response: Response): Promise<void> {
    const transacao = await sequelize.transaction();
    try {
      const { Nome, Id } = request.body;
      const servicoCultura = new CulturaService();
      await servicoCultura.Atualizar({ Nome: Nome, Id: Id }, transacao);
      await transacao.commit();
      response.status(200).json({ message: "Registro atualizado com sucesso" });
    } catch (error) {
      await transacao.rollback();
      if (error instanceof ServicoException) {
        response
          .status(error.statusCode)
          .json(new RespostaPadrao(false, error.message));
        return;
      }
      response
        .status(400)
        .json({ error: "Ocorreu um erro ao tentar atualizar o cultura" });
    }
  }

  static async Remover(request: Request, response: Response): Promise<void> {
    const transacao = await sequelize.transaction();
    try {
      const { id } = request.params;
      const servicoCultura = new CulturaService();
      await servicoCultura.Remover(Number(id), transacao);
      await transacao.commit();
      response
        .status(200)
        .json(new RespostaPadrao(true, "Cultura removida com sucesso"));
    } catch (error) {
      await transacao.rollback();
      if (error instanceof ServicoException) {
        response
          .status(error.statusCode)
          .json(new RespostaPadrao(false, error.message));
        return;
      }

      response
        .status(400)
        .json(
          new RespostaPadrao(
            false,
            "Ocorreu um erro ao tentar remover o cultura"
          )
        );
    }
  }

  static async BuscarPorCodigo(
    request: Request,
    response: Response
  ): Promise<void> {
    try {
      const { id } = request.params;
      const servicoCultura = new CulturaService();
      const cultura = await servicoCultura.BuscarInformacoesPorCodigo(
        Number(id)
      );
      response.status(200).json(new RespostaPadrao(cultura));
    } catch (error) {
      if (error instanceof ServicoException) {
        response
          .status(error.statusCode)
          .json(new RespostaPadrao(false, error.message));
        return;
      }
      response
        .status(400)
        .json(
          new RespostaPadrao(false, "Ocorreu um erro ao tentar buscar cultura")
        );
    }
  }
  //#endregion
}
