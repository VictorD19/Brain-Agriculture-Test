import { Transaction } from "sequelize";
import { RepositorioBase } from "@repositorios/base/RepositorioBase";
import { FazendaCulturaModel } from "@modelos/FazendaCulturaModel";

export class FazendaCulturaRepositorio extends RepositorioBase<FazendaCulturaModel> {
  //#region Metodos Publicos
  async VincularCulturaComFazenda(
    idCultura: number,
    idFazenda: number,
    transaction?: Transaction
  ): Promise<void> {
    const vinculacao = await this._modelo.create(
      { CulturaId: idCultura, FazendaId: idFazenda },
      transaction ? { transaction } : undefined
    );
    await vinculacao.save();
  }

  async RemoverFazendaCulturaPorFazendaId(
    idFazenda: number,
    transaction?: Transaction
  ): Promise<void> {
    await this._modelo.destroy({
      where: { FazendaId: idFazenda },
      transaction: transaction,
    });
  }

  async ExisteVinculacao(
    idFazenda: number,
    idCultura: number
  ): Promise<boolean> {
    const existeVinculo = await this._modelo.findOne({
      where: {
        FazendaId: idFazenda,
        CulturaId: idCultura,
      },
    });
    return existeVinculo != null;
  }
  //#endregion
}
