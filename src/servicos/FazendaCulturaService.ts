import { Transaction } from "sequelize";
import { FazendaCulturaRepositorio } from "@repositorios/FazendaCulturaRepositorio";
import { FazendaCulturaModel } from "@modelos/FazendaCulturaModel";
import { FazendaService } from "@servicos/FazendaService";
import { CulturaService } from "./CulturaService";
import { ServicoException } from "@utilidades/Error";

export class FazendaCulturaService {
  //#region Atributos
  private readonly _repositorioFazendaCultura: FazendaCulturaRepositorio;
  //#endregion

  //#region  Construtores
  constructor() {
    this._repositorioFazendaCultura = new FazendaCulturaRepositorio(
      FazendaCulturaModel
    );
  }
  //#endregion

  //#region  Metodos Publicos
  async RemoverPorProdutor(
    idProdutor: number,
    transition?: Transaction
  ): Promise<void> {
    const servicoFazenda = new FazendaService();
    const codigosFazenda = await servicoFazenda.ObterCodigosFazendaPorProdutor(
      idProdutor
    );
    for (let i = 0; i < codigosFazenda.length; i++) {
      const codigoFazendaAtual = codigosFazenda[i];
      await this._repositorioFazendaCultura.RemoverFazendaCulturaPorFazendaId(
        codigoFazendaAtual,
        transition
      );
    }
  }

  async RemoverPorFazendaId(
    fazendaId: number,
    transition?: Transaction
  ): Promise<void> {
    await this._repositorioFazendaCultura.RemoverFazendaCulturaPorFazendaId(
      fazendaId,
      transition
    );
  }

  async VincularCulturaComFazendaPorId(
    idFazenda: number,
    idCultura: number,
    transition?: Transaction
  ): Promise<void> {
    const servicoCultura = new CulturaService();

    if (!(await servicoCultura.ExisteCulturaPorId(idCultura)))
      throw new ServicoException(`A cultura ${idCultura} não esta cadastrada`);

    if (
      await this._repositorioFazendaCultura.ExisteVinculacao(
        idFazenda,
        idCultura
      )
    )
      return;

    await this._repositorioFazendaCultura.VincularCulturaComFazenda(
      idCultura,
      idFazenda,
      transition
    );
  }

  //#endregion
}
