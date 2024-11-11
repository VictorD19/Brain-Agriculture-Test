import { Model, Optional, DataTypes } from "sequelize";
import { sequelize } from "@configuracoes/sequelize";
import { FazendaModel } from "@modelos/FazendaModel";

interface ICulturaAtributos {
  Id: number;
  Nome: string;
}

export interface ICulturaCriacaoAtributos extends Optional<ICulturaAtributos, "Id"> {}

class CulturaModel
  extends Model<ICulturaAtributos, ICulturaCriacaoAtributos>
  implements ICulturaAtributos
{
  public Id!: number;
  public Nome!: string;
  public readonly Fazendas?: FazendaModel[];

  public readonly DataCriacao!: Date;
  public readonly DataUltimaAtualizacao!: Date;
}

CulturaModel.init(
  {
    Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, tableName: "T_CULTURA", modelName: "Cultura" }
);

export { CulturaModel };
