import { Model, DataType } from "sequelize";

class FazendaCulturaModel extends Model {
  public Id!: number;
  public FazendaId!: number;
  public CulturaId!: number;
}

export { FazendaCulturaModel };
