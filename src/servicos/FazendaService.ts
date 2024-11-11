import { Transaction } from "sequelize";
import { FazendaRepositorio } from "@repositorios/FazendaRepositorio";
import { ServicoException } from "@utilidades/Error";
import { FazendaModel, IFazendaAtributosCriacao } from "@modelos/FazendaModel";
import { FazendaCulturaService } from "./FazendaCulturaService";

export class FazendaService {
  //#region Atributos
  private readonly _repositorioFazenda: FazendaRepositorio;
  //#endregion

  //#region Constructores
  constructor() {
    this._repositorioFazenda = new FazendaRepositorio(FazendaModel);
  }
  //#endregion

  //#region Metodos Publicos
  async CriarFazendas(
    idProdutor: number,
    fazendas: IFazendaAtributosCriacao[],
    transaction?: Transaction
  ): Promise<void> {
    const servicoFazendaCultura = new FazendaCulturaService();
    for (let i = 0; i < fazendas.length; i++) {
      const fazendaCriar: IFazendaAtributosCriacao = fazendas[i];

      this.ValidarDadosFazenda(fazendaCriar);

      const fazendaCriada: FazendaModel =
        await this._repositorioFazenda.Inserir(
          { ...fazendaCriar, ProdutorId: idProdutor },
          transaction
        );

      if (fazendaCriar.Culturas != null && fazendaCriar.Culturas.length > 0) {
   
        for (let i = 0; i < (fazendaCriar?.Culturas?.length ?? 0); i++) {
          await servicoFazendaCultura.VincularCulturaComFazendaPorId(fazendaCriada.Id,fazendaCriar.Culturas[i],transaction)
        }
      }
    }
  }

  async AtualizarFazendas(
    idProdutor: number,
    fazendas: IFazendaAtributosCriacao[],
    transaction?: Transaction
  ): Promise<void> {
    const fazendasProdutor =
      await this._repositorioFazenda.BuscarFazendasPorIDProdutor(idProdutor);

    if (fazendasProdutor != null && fazendasProdutor.length > 0) {
      const codigosFazendasManter: number[] = [];

      fazendas.forEach((fazenda) => {
        if (fazenda.Id != null && fazenda?.Id > 0)
          codigosFazendasManter.push(fazenda.Id);
      });

      const fazendasRemover = fazendasProdutor.filter(
        (fazenda) => !codigosFazendasManter.includes(fazenda.Id)
      );

      for (let i = 0; i < fazendasRemover.length; i++) {
        const fazendaRemover = fazendasRemover[i];
        await this._repositorioFazenda.Deletar(fazendaRemover.Id, transaction);
      }
    }

    const servicoFazendaCultura = new FazendaCulturaService();

    for (let i = 0; i < fazendas.length; i++) {
      const fazendaAtualizar: IFazendaAtributosCriacao = fazendas[i];

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

      if (
        fazendaAtualizar.Culturas == null ||
        fazendaAtualizar.Culturas.length == 0
      ) {
        await servicoFazendaCultura.RemoverPorFazendaId(fazenda.Id);
        continue;
      }

      for (let i = 0; i < (fazendaAtualizar?.Culturas?.length ?? 0); i++) {
        await servicoFazendaCultura.VincularCulturaComFazendaPorId(   fazenda.Id,
          fazendaAtualizar.Culturas[i],
          transaction
        );
      }
    }
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

  //#region  Metodos Privados
  ValidarDadosFazenda(fazendaCriar: IFazendaAtributosCriacao): void {
    if (!fazendaCriar.Nome)
      throw new ServicoException("Precisa informar um nome para sua fazenda");

    if (!fazendaCriar.Estado)
      throw new ServicoException(
        "Precisa informar o estado onde se encontra sua fazenda"
      );

    if (!fazendaCriar.Cidade)
      throw new ServicoException(
        "Precisa informar a cidade onde se encontra sua fazenda"
      );

    if (fazendaCriar.AreaAgricultavel == 0)
      throw new ServicoException("Precisa informar a área agricultável");

    if (fazendaCriar.AreaTotal == 0)
      throw new ServicoException(
        "Precisa informar a área total da sua fazenda"
      );

    if (fazendaCriar.AreaVegetacao == 0)
      throw new ServicoException("Precisa informar a área de vegetação");

    if (
      fazendaCriar.AreaVegetacao + fazendaCriar.AreaAgricultavel >
      fazendaCriar.AreaTotal
    )
      throw new ServicoException(
        `A soma da área de vegetação e a área agricultavel da fazenda '${fazendaCriar.Nome}' não pode ser maior que a área total`
      );
  }
  //#endregion
}
