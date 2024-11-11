import { Model, Optional, DataTypes } from "sequelize";
import { sequelize } from "@configuracoes/sequelize";
import { CulturaModel } from "./CulturaModel";

export interface IFazendaAtributos {
  Id: number;
  ProdutorId: number;
  Nome: string;
  Cidade: string;
  Estado: string;
  AreaTotal: number;
  AreaAgricultavel: number;
  AreaVegetacao: number;
}

export interface IFazendaAtributosCriacao
  extends Optional<IFazendaAtributos, "Id"> {
  Culturas?: number[];
}

class FazendaModel
  extends Model<IFazendaAtributos, IFazendaAtributosCriacao>
  implements IFazendaAtributos
{
  public Id!: number;
  public ProdutorId!: number;
  public Nome!: string;
  public Cidade!: string;
  public Estado!: string;
  public AreaTotal!: number;
  public AreaAgricultavel!: number;
  public AreaVegetacao!: number;

  public readonly CulturasVinculadas?: CulturaModel[];
  public readonly DataCriacao!: Date;
  public readonly DataUltimaAtualizacao!: Date;
}

FazendaModel.init(
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
    AreaAgricultavel: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    AreaTotal: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Cidade: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    AreaVegetacao: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Estado: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ProdutorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "T_PRODUTOR", key: "Id" },
    },
  },
  {
    sequelize,
    tableName: "T_FAZENDA",
    modelName: "Fazenda",
  }
);



export { FazendaModel };
