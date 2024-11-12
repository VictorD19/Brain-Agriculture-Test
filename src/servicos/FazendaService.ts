import { Transaction } from "sequelize";
import { FazendaRepositorio } from "@repositorios/FazendaRepositorio";
import { ServicoException } from "@utilidades/Error";
import { FazendaModel, IFazendaAtributosCriacao } from "@modelos/FazendaModel";

export class FazendaService {
  //#region Atributos
  private readonly _repositorioFazenda: FazendaRepositorio;
  //#endregion

  //#region Constructores
  constructor(repositorioFazenda?: FazendaRepositorio) {
    this._repositorioFazenda =
      repositorioFazenda || new FazendaRepositorio(FazendaModel);
  }
  //#endregion

  //#region Metodos Publicos
  async CriarFazendas(
    idProdutor: number,
    fazendaCriar: IFazendaAtributosCriacao,
    transaction?: Transaction
  ): Promise<number> {
    
    const validacoesOk: string = this.ValidarDadosFazenda(fazendaCriar);
    if (validacoesOk != "") throw new ServicoException(validacoesOk);

    const fazendaCriada: FazendaModel = await this._repositorioFazenda.Inserir(
      { ...fazendaCriar, ProdutorId: idProdutor },
      transaction
    );
    return fazendaCriada.Id;
  }

  async RemoverFazendaNaoInclusas(
    idProdutor: number,
    codigosFazendasManter: number[],
    transaction?: Transaction
  ): Promise<void> {
    const fazendasProdutor =
      await this._repositorioFazenda.BuscarFazendasPorIDProdutor(idProdutor);

    if (fazendasProdutor != null && fazendasProdutor.length > 0) {
 
      const fazendasRemover = fazendasProdutor.filter(
        (fazenda) => !codigosFazendasManter.includes(fazenda.Id)
      );

      for (let i = 0; i < fazendasRemover.length; i++) {
        const fazendaRemover = fazendasRemover[i];
        await this._repositorioFazenda.Deletar(fazendaRemover.Id, transaction);
      }
    }
  }

  async AtualizarFazendas(
    idProdutor: number,
    fazendaAtualizar: IFazendaAtributosCriacao,
    transaction?: Transaction
  ): Promise<number> {
    this.ValidarDadosFazenda(fazendaAtualizar);

    let fazenda: FazendaModel;
    if (!fazendaAtualizar.Id || fazendaAtualizar.Id == 0)
      fazenda = await this._repositorioFazenda.Inserir(
        {
          ...fazendaAtualizar,
          ProdutorId: idProdutor,
        },
        transaction
      );
    else {
      const [_, fazendaAtualizada] = await this._repositorioFazenda.Atualizar(
        fazendaAtualizar?.Id ?? 0,
        { ...fazendaAtualizar, ProdutorId: idProdutor },
        transaction
      );
      fazenda = fazendaAtualizada[0];
    }
    return fazenda.Id;
  }

  async ObterCodigosFazendaPorProdutor(idProdutor: number): Promise<number[]> {
    return await this._repositorioFazenda.ObterCodigosFazendasPorProdutor(
      idProdutor
    );
  }

  async RemoverFazendasPorIdProdutor(
    idProduto: number,
    transaction?: Transaction
  ): Promise<void> {
    await this._repositorioFazenda.RemoverFazendaPorIdProdutor(
      idProduto,
      transaction
    );
  }

  async ObterFazendasDoProdutor(idProdutor: number): Promise<FazendaModel[]> {
    return await this._repositorioFazenda.BuscarFazendasPorIDProdutor(
      idProdutor
    );
  }

  //#endregion

  //#region  Metodos Auxiliares
  ValidarDadosFazenda(fazendaCriar: IFazendaAtributosCriacao): string {
    if (!fazendaCriar.Nome) return "Precisa informar um nome para sua fazenda";

    if (!fazendaCriar.Estado)
      return "Precisa informar o estado onde se encontra sua fazenda";

    if (!fazendaCriar.Cidade)
      return "Precisa informar a cidade onde se encontra sua fazenda";

    if (fazendaCriar.AreaAgricultavel == 0)
      return "Precisa informar a área agricultável";

    if (fazendaCriar.AreaTotal == 0)
      return "Precisa informar a área total da sua fazenda";

    if (fazendaCriar.AreaVegetacao == 0)
      return "Precisa informar a área de vegetação";

    if (
      fazendaCriar.AreaVegetacao + fazendaCriar.AreaAgricultavel >
      fazendaCriar.AreaTotal
    )
      return `A soma da área de vegetação e a área agricultável da fazenda '${fazendaCriar.Nome}' não pode ser maior que a área total`;

    return "";
  }
  //#endregion
}
