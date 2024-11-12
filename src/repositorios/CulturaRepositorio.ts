import { CulturaModel } from "@modelos/CulturaModel";
import { RepositorioBase } from "./base/RepositorioBase";
import { IFazendasPorCultura } from "interfaces/IFazendasPorCultura";
import { sequelize } from "@configuracoes/sequelize";
import { FazendaCulturaModel } from "@modelos/FazendaCulturaModel";

export class CulturaRepositorio extends RepositorioBase<CulturaModel> {
  //#region  Metodos Publicos
  async VerificarSeExistePorNome(nomeCultura: string): Promise<boolean> {
    const existeCultura = await this._modelo.findOne({
      where: {
        Nome: nomeCultura,
      },
    });
    return existeCultura != null;
  }

  async VerificarSeExistePorId(idCultura: number): Promise<boolean> {
    const existeCultura = await this._modelo.findByPk(idCultura);
    return existeCultura != null;
  }

  async ObterTotalDeFazendasPorCulturas(): Promise<IFazendasPorCultura[]> {
    const fazendasPorCultura = (await FazendaCulturaModel.findAll({
      attributes: [
        "CulturaId",
        [sequelize.fn("COUNT", sequelize.col("FazendaId")), "quantidade"],
      ],
      include: [
        {
          model: CulturaModel,
          as: "Cultura",
          attributes: ["Nome"], 
        },
      ],
      group: ["CulturaId","Cultura.Nome","Cultura.Id"],
    })) as FazendaCulturaModel[];

    return await fazendasPorCultura.map((cultura) => {
      return {
        nome: `${cultura.Cultura?.Nome}`,
        quantidade: parseInt(cultura.get("quantidade") as string, 10),
      } as IFazendasPorCultura;
    });
  }

  async ObterTotalDeFazendasPorCulturasEProdutor(
    idProdutor: number
  ): Promise<IFazendasPorCultura[]> {
    const fazendasPorCultura = (await CulturaModel.findAll({
      attributes: [
        "nome",
        [
          sequelize.fn("COUNT", sequelize.col("FazendaCultura.fazendaId")),
          "quantidade",
        ],
      ],
      where: {},
      include: [
        {
          model: FazendaCulturaModel,
          attributes: [],
        },
      ],
      group: ["nome"],
    })) as CulturaModel[];

    return await fazendasPorCultura.map((cultura) => {
      return {
        nome: cultura.Nome,
        quantidade: parseInt(cultura.get("quantidade") as string, 10),
      } as IFazendasPorCultura;
    });
  }
  //#endregion
}
