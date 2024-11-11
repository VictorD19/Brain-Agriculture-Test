import { MakeNullishOptional } from "sequelize/types/utils";
import { IRepositorioBase } from "./IRepositorioBase";
import { Model, ModelStatic, Op, Transaction, WhereOptions } from "sequelize";

export class RepositorioBase<T extends Model> implements IRepositorioBase<T> {
  //#region  Atributos
  protected _modelo: ModelStatic<T>;
  //#endregion

  //#region Construtores
  constructor(modelo: ModelStatic<T>) {
    this._modelo = modelo;
  }
  //#endregion

  //#region  Metodos Publicos
  async Inserir(item: Partial<T>, transaction?: Transaction): Promise<T> {
    let itemCriacao = await this._modelo.create(
      item as MakeNullishOptional<T["_creationAttributes"]>,
      { transaction }
    );
    await itemCriacao.save();
    return itemCriacao;
  }
  async BuscarPorCodigo(codigo: number): Promise<T | null> {
    return await this._modelo.findByPk(codigo);
  }
  async BuscarPorCodigos(codigos: number[]): Promise<T[]> {
    const where: WhereOptions = {
      ["Id"]: {
        [Op.in]: codigos,
      },
    };
    return await this._modelo.findAll({ where });
  }
  async BuscarTodos(): Promise<T[]> {
    return await this._modelo.findAll();
  }
  async Deletar(Id: number, transaction?: Transaction): Promise<number | null> {
    const where: WhereOptions = { Id };
    return await this._modelo.destroy({ where, transaction: transaction });
  }
  async Atualizar(
    id: number,
    item: Partial<T>,
    transacao?: Transaction
  ): Promise<[number, T[]]> {
    const where: WhereOptions = {
      Id: id,
    };
    return await this._modelo.update(item, {
      where,
      returning: true,
      transaction: transacao,
    });
  }
  async ContarTodos(): Promise<number> {
    return await this._modelo.count();
  }
  async BuscarPrimerRegistro(): Promise<T | null> {
    return await this._modelo.findOne();
  }
  //#endregion
}
