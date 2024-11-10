import { Model, Optional, DataTypes } from "sequelize";
import { FazendaModel } from "./FazendaModel";
import { sequelize } from "../config/sequelize";

interface IProdutorAtributos {
  Id: number;
  Nome: string;
  CpfCnpj: string;
}

interface IProdutorAtributosCriacao
  extends Optional<IProdutorAtributos, "Id"> {}

class ProdutorModel
  extends Model<IProdutorAtributos, IProdutorAtributosCriacao>
  implements IProdutorAtributos
{
  public Id!: number;
  public Nome!: string;
  public CpfCnpj!: string;

  public readonly DataCriacao!: Date;
  public readonly DataUltimaAtualizacao!: Date;
}
ProdutorModel.init(
  {
    Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    CpfCnpj: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Produtor",
    tableName: "T_PRODUTOR",
  }
);

ProdutorModel.hasMany(FazendaModel, {
  foreignKey: "ProdutorId",
  as: "T_FAZENDA",
});

export { ProdutorModel };
