import { CulturaModel, ICulturaCriacaoAtributos } from "@modelos/CulturaModel";
import { CulturaRepositorio } from "@repositorios/CulturaRepositorio";
import { ServicoException } from "@utilidades/Error";
import { Transaction } from "sequelize";

export class CulturaService {
  //#region  Atributos
  private readonly _repositorioCultura: CulturaRepositorio;
  //#endregion

  //#region  Construtores
  constructor(repositorioCultura?: CulturaRepositorio) {
    this._repositorioCultura = repositorioCultura || new CulturaRepositorio(CulturaModel);
  }
  //#endregion

  //#region Metodos Publicos
  async Criar(
    cultura: ICulturaCriacaoAtributos,
    transacao?: Transaction
  ): Promise<void> {
    if (!cultura.Nome)
      throw new ServicoException(
        "Precisa informar um nome valido para sua cultura"
      );
    if (await this._repositorioCultura.VerificarSeExistePorNome(cultura.Nome))
      throw new ServicoException("Cultura já existe");

    await this._repositorioCultura.Inserir(cultura, transacao);
  }

  async Atualizar(
    cultura: ICulturaCriacaoAtributos,
    transacao?: Transaction
  ): Promise<void> {
    if (!cultura.Nome)
      throw new ServicoException(
        "Precisa informar um nome valido para sua cultura"
      );

    if (!cultura.Id || cultura.Id == 0)
      throw new ServicoException(
        "Precisa informar o registro que deseja atualizar",404
      );

    await this._repositorioCultura.Atualizar(cultura.Id, cultura, transacao);
  }

  async Remover(idCultura: number, transacao?: Transaction) {
    if (!(await this._repositorioCultura.VerificarSeExistePorId(idCultura)))
      throw new ServicoException(
        "A cultura que você esta tentado remover não existe",
        404
      );
    await this._repositorioCultura.Deletar(idCultura, transacao);
  }

  async BuscarInformacoesPorCodigo(
    idCultura: number
  ): Promise<CulturaModel | null> {
    const existeCultura = await this._repositorioCultura.BuscarPorCodigo(
      idCultura
    );
    if (!existeCultura)
      throw new ServicoException(
        "A cultura que esta tentado consultar não existe",
        404
      );
    return existeCultura;
  }
  
  async ExisteCulturaPorId(idCultura: number):Promise<boolean>{
    return await this._repositorioCultura.VerificarSeExistePorId(idCultura);
  }
  
  //#endregion
}
