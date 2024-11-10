import { MakeNullishOptional } from "sequelize/types/utils";
import { IRepositorioBase } from "./IRepositorioBase";
import { Model, ModelStatic, Op, WhereOptions } from "sequelize";

export class RepositorioBase<T extends Model> implements IRepositorioBase<T> {
  private _modelo: ModelStatic<T>;

  constructor(modelo: ModelStatic<T>) {
    this._modelo = modelo;
  }
  Inserir(item: T): Promise<T> {
    return this._modelo.create(
      item as MakeNullishOptional<T["_creationAttributes"]>
    );
  }
  BuscarPorCodigo(codigo: number): Promise<T | null> {
    return this._modelo.findByPk(codigo);
  }
  BuscarPorCodigos(codigos: number[]): Promise<T[]> {
    const where: WhereOptions = {
      ["id"]: {
        [Op.in]: codigos,
      },
    };
    return this._modelo.findAll({ where });
  }
  BuscarTodos(): Promise<T[]> {
    return this._modelo.findAll();
  }
  Deletar(id: number): Promise<number | null> {
    const where: WhereOptions = { id };
    return this._modelo.destroy({ where });
  }
  Atualizar(id: number, item: Partial<T>): Promise<[number, T[]]> {
    const where: WhereOptions = {
      id,
    };
    return this._modelo.update(item, { where, returning: true });
  }
  ContarTodos(): Promise<number> {
    return this._modelo.count();
  }
  BuscarPrimerRegistro(): Promise<T | null> {
    return this._modelo.findOne();
  }
}
