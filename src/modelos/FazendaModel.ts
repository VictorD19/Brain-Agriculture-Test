import { Model, Optional, DataTypes } from "sequelize";
import { ProdutorModel } from "./ProdutorModel";
import { sequelize } from "../config/sequelize";

interface IFazendaAtributos {
  Id: number;
  ProdutorId: number;
  Nome: string;
  Cidade: string;
  Estado: string;
  AreaTotal: number;
  AreaAgrucultavel: number;
  AreaVegetacao: number;
}

interface IFazendaAtributosCriacao extends Optional<IFazendaAtributos, "Id"> {}

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
  public AreaAgrucultavel!: number;
  public AreaVegetacao!: number;

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
    AreaAgrucultavel: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    AreaTotal: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Cidade: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    AreaVegetacao: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Estado: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ProdutorId: {
      type: DataTypes.INTEGER,
      references: { model: "Produtor", key: "Id" },
    },
  },
  {
    sequelize,
    tableName: "T_FAZENDA",
    modelName: "Fazenda",
  }
);

FazendaModel.belongsTo(ProdutorModel, {
  foreignKey: "ProdutorId",
  as: "Produtor",
});
export { FazendaModel };
