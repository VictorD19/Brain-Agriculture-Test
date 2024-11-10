import { error } from "console";
import { Request, Response } from "express";
import { RespostaPadrao } from "utilidades/RespostaPadrao";

interface RepostaPadrao {
  Sucess: true;
  Data: unknown;
  Mensagems: string;
}
export default class {
  static async Inserir(request: Request, reponse: Response): Promise<void> {
    try {
      // lógica de busca por código
      reponse.status(201).json(new RespostaPadrao({ data: "" }));
    } catch (error) {
      reponse.status(400).json({ error: "Erro interno" });
    }
  }

  static async Atualizar(request: Request, reponse: Response): Promise<void> {
    try {
      reponse.status(200).json({ message: "Produtor encontrado" });
    } catch (error) {
      reponse.status(400).json({ error: "Erro interno" });
    }
  }
  static async Remover(request: Request, reponse: Response): Promise<void> {
    try {
      reponse.status(200).json({ message: "Produtor encontrado" });
    } catch (error) {
      reponse.status(400).json({ error: "Erro interno" });
    }
  }
  static async BuscarPorCodigo(
    request: Request,
    reponse: Response
  ): Promise<void> {
    try {
      reponse
        .status(201)
        .json(
          new RespostaPadrao(
            false,
            { data: "" },
            "não foi possivel cria obejtos"
          )
        );
    } catch (error) {
      reponse
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
