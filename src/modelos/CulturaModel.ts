import { Model, DataType } from "sequelize";

class CulturaModel extends Model {
  public Id!: number;
  public Nome!: string;
}

export { CulturaModel };
