import { Model, DataTypes, Association } from "sequelize";
import { sequelize } from "@configuracoes/sequelize";
import { FazendaModel } from "@modelos/FazendaModel";
import { CulturaModel } from "@modelos/CulturaModel";

interface IFazendaAtributos {
  FazendaId: number;
  CulturaId: number;
}

class FazendaCulturaModel
  extends Model<IFazendaAtributos>
  implements IFazendaAtributos
{
  public FazendaId!: number;
  public CulturaId!: number;

  public readonly Cultura?: CulturaModel;
  public static associations: {
    Cultura: Association<FazendaCulturaModel, CulturaModel>;
  };
  public readonly DataCriacao!: Date;
  public readonly DataUltimaAtualizacao!: Date;
}

FazendaCulturaModel.init(
  {
    CulturaId: {
      type: DataTypes.INTEGER,
      references: { key: "Id", model: "T_CULTURA" },
    },
    FazendaId: {
      type: DataTypes.INTEGER,
      references: { key: "Id", model: "T_FAZENDA" },
    },
  },
  { sequelize, tableName: "T_FAZENDA_CULTURA", modelName: "FazendaCultura" }
);

FazendaModel.belongsToMany(CulturaModel, {
  through: FazendaCulturaModel,
  as: "CulturasVinculadas",
  foreignKey: "FazendaId",
});

CulturaModel.belongsToMany(FazendaModel, {
  through: FazendaCulturaModel,
  as: "Fazendas",
  foreignKey: "CulturaId",
});

// Associação com CulturaModel
FazendaCulturaModel.belongsTo(CulturaModel, {
  foreignKey: "CulturaId",
  as: "Cultura",
});

export { FazendaCulturaModel };
