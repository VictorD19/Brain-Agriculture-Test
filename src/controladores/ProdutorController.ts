import { Request, Response } from "express";
import { sequelize } from "@configuracoes/sequelize";
import { FazendaService } from "@servicos/FazendaService";
import { ProdutorService } from "@servicos/ProdutorService";
import { ServicoException } from "@utilidades/Error";
import { RespostaPadrao } from "@utilidades/RespostaPadrao";
import { FazendaCulturaService } from "@servicos/FazendaCulturaService";
import { IFazendaAtributosCriacao } from "@modelos/FazendaModel";

/**
 * @swagger
 * tags:
 *   name: Produtor
 *   description: Endpoints relacionados ao produtores
 */

export  class ProdutorController {
  static async Inserir(request: Request, response: Response): Promise<void> {
    const transacao = await sequelize.transaction();
    try {
      const { nome, cpf_cnpj, fazendas } = request.body;

      const produtorServico = new ProdutorService();
      const produtor = await produtorServico.BuscarProdutorPorCPF_CNPJ(
        cpf_cnpj
      );

      if (produtor) throw new ServicoException("Usuario ja possui cadastro ");
      const produtorCriado = await produtorServico.Criar(
        {
          CpfCnpj: cpf_cnpj,
          Nome: nome,
        },
        transacao
      );
      const fazendaServico = new FazendaService();
      const fazendaCulturaServico = new FazendaCulturaService();

      for (let i = 0; i < fazendas.length; i++) {
        const fazendaCriar:IFazendaAtributosCriacao = fazendas[i];
        const idFazendaCriada:number = await fazendaServico.CriarFazendas(produtorCriado.Id,fazendaCriar,transacao);
        if (fazendaCriar.Culturas != null && fazendaCriar.Culturas.length > 0) {
          for (let i = 0; i < (fazendaCriar?.Culturas?.length ?? 0); i++) {
            await fazendaCulturaServico.VincularCulturaComFazendaPorId(idFazendaCriada,fazendaCriar.Culturas[i],transacao)
          }
        }
      }

      await transacao.commit();
      response
        .status(201)
        .json(new RespostaPadrao(true, "Usuario criado com sucesso"));
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
        .json({ error: "Ocorreu um erro ao tentar criar o usuario" });
    }
  }

  static async Atualizar(request: Request, response: Response): Promise<void> {
    const transacao = await sequelize.transaction();
    try {
      const { id, nome, cpf_cnpj, fazendas } = request.body;

      const produtorServico = new ProdutorService();
      await produtorServico.Atualizar(id, { Nome: nome, CpfCnpj: cpf_cnpj },transacao);

      const fazendaServico = new FazendaService();
      const fazendaCulturaServico = new FazendaCulturaService();

      await  fazendaServico.RemoverFazendaNaoInclusas(id,fazendas,transacao);

      for (let i = 0; i < fazendas.length; i++) {
        const fazendaProcessar:IFazendaAtributosCriacao = fazendas[i];
        const idFazendaAtualizar:number = await fazendaServico.AtualizarFazendas(Number(id), fazendaProcessar,transacao);
        
      if (fazendaProcessar.Culturas == null ||fazendaProcessar.Culturas.length == 0) {
        await fazendaCulturaServico.RemoverPorFazendaId(idFazendaAtualizar);
        continue;
      }
      for (let i = 0; i < fazendaProcessar.Culturas.length; i++) {
        await fazendaCulturaServico.VincularCulturaComFazendaPorId(idFazendaAtualizar,fazendaProcessar.Culturas[i],transacao)
      }
      }
 
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
        .json({ error: "Ocorreu um erro ao tentar atualizar o produtor" });
    }
  }

  static async Remover(request: Request, response: Response): Promise<void> {
    const transacao = await sequelize.transaction();
    try {
      const { id } = request.params;
      const produtorServico = new ProdutorService();
      await produtorServico.Remover(Number(id), transacao);
      await transacao.commit();
      response
        .status(200)
        .json(new RespostaPadrao(true, "Produtor removido com sucesso"));
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
            "Ocorreu um erro ao tentar remover o produtor"
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
      const produtorServico = new ProdutorService();
      const produtor = await produtorServico.ObterInformacoesPorId(Number(id));
      response.status(200).json(new RespostaPadrao(produtor));
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
          new RespostaPadrao(
            false,
            "Ocorreu um erro ao tentar buscar o usuario"
          )
        );
    }
  }
}
