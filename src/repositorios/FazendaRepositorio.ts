import { Transaction } from "sequelize";
import { FazendaModel, IFazendaAtributos } from "@modelos/FazendaModel";
import { RepositorioBase } from "@repositorios/base/RepositorioBase";
import { CulturaModel } from "@modelos/CulturaModel";
import { sequelize } from "@configuracoes/sequelize";
import { IFazendasAgrupadasPorEstado } from "interfaces/IFazendasPorEstado";

export class FazendaRepositorio extends RepositorioBase<FazendaModel> {
  //#region Metodos Publicos
  async BuscarFazendasPorIDProdutor(
    idProdutor: number
  ): Promise<FazendaModel[]> {
    return this._modelo.findAll({
      where: {
        ProdutorId: idProdutor,
      },
      include: {
        model: CulturaModel,
        as: "CulturasVinculadas",
        attributes: ["Id", "Nome"],
      },
    });
  }

  async RemoverFazendaPorIdProdutor(
    idProdutor: number,
    transaction?: Transaction
  ): Promise<void> {
    await this._modelo.destroy({
      where: { ProdutorId: idProdutor },
      transaction: transaction,
    });
  }

  async ObterCodigosFazendasPorProdutor(idProdutor: number): Promise<number[]> {
    const fazendaCodigos = await this._modelo.findAll({
      attributes: ["Id"],
      where: {
        ProdutorId: idProdutor,
      },
    });
    return fazendaCodigos.map((fazenda) => fazenda.Id);
  }

  async ObterAreaTotalDeTodasAsFazenda(): Promise<number> {
    return await this._modelo.sum("AreaTotal");
  }

  async ObterAreaTotalDeTodasAsFazendaPorProdutor(
    idProdutor?: number
  ): Promise<number> {
    return await this._modelo.sum("AreaTotal", {
      where: { ProdutorId: idProdutor },
    });
  }

  async ContarTodasAsFazendasPorProdutor(idProdutor?: number): Promise<number> {
    return await this._modelo.count({
      where: { ProdutorId: idProdutor },
    });
  }

  async ObterFazendasPorEstado(): Promise<IFazendasAgrupadasPorEstado[]> {
    const fazendasAgrupadas = (await this._modelo.findAll({
      attributes: [
        "Estado",
        [sequelize.fn("COUNT", sequelize.col("Id")), "quantidade"],
      ],
      group: ["Estado"],
    })) as FazendaModel[];

    const resultado: IFazendasAgrupadasPorEstado[] = await fazendasAgrupadas.map(
      (fazenda) => ({
        estado: fazenda.Estado,
        quantidade: parseInt(fazenda.get("quantidade") as string, 10),
      })
    );
    return resultado;
  }

  async ObterFazendasPorEstadoEProdutor(idProdutor: number): Promise<IFazendasAgrupadasPorEstado[]> {
    const fazendasAgrupadas = (await this._modelo.findAll({
      attributes: [
        "estado",
        [sequelize.fn("COUNT", sequelize.col("Id")), "quantidade"],
      ],
      where:{
        ProdutorId:idProdutor
      },
      group: ["estado"],
    })) as FazendaModel[];

    const resultado: IFazendasAgrupadasPorEstado[] = fazendasAgrupadas.map(
      (fazenda) => ({
        estado: fazenda.Estado,
        quantidade: parseInt(fazenda.get("quantidade") as string, 10),
      })
    );
    return resultado;
  }

  async ObterTotalAgricultavelDeTodasAsFazendas():Promise<number>{
    return await this._modelo.sum("AreaAgricultavel");
  }
  async ObterTotalAgricultavelDeTodasAsFazendasDoProdutor(idProductor:number):Promise<number>{
    return await this._modelo.sum("AreaAgricultavel",{ where: {ProdutorId: idProductor}});
  }

  async ObterTotalVegetacaoDeTodasAsFazendas():Promise<number>{
    return await this._modelo.sum("AreaVegetacao");
  }
  async ObterTotalVegetacaoDeTodasAsFazendasDoProdutor(idProductor:number):Promise<number>{
    return await this._modelo.sum("AreaVegetacao",{ where: {ProdutorId: idProductor}});
  }
  //#endregion
}
