import { CulturaModel } from "@modelos/CulturaModel";
import { FazendaModel } from "@modelos/FazendaModel";
import { CulturaRepositorio } from "@repositorios/CulturaRepositorio";
import { FazendaRepositorio } from "@repositorios/FazendaRepositorio";
import { IFazendasPorCultura } from "interfaces/IFazendasPorCultura";
import { IFazendasAgrupadasPorEstado } from "interfaces/IFazendasPorEstado";

export class DashboardService {
  //#region Atributos
  private readonly _repositorioCultura: CulturaRepositorio;
  private readonly _repositorioFazenda: FazendaRepositorio;
  //#endregion

  //#region construtores
  constructor() {
    this._repositorioCultura = new CulturaRepositorio(CulturaModel);
    this._repositorioFazenda = new FazendaRepositorio(FazendaModel);
  }
  //#endregion

  //#region  Metodos Publicos
  async ObteResumoDados(): Promise<{
    totalFazenda: number;
    totalArea: number;
    fazendasPorEstado: IFazendasAgrupadasPorEstado[];
    fazendasPorCultura: IFazendasPorCultura[];
    totalAreaAgricultavel: number;
    totalAreaVegetacao: number;
  }> {
    const totalFazenda: number = await this._repositorioFazenda.ContarTodos();
    const totalArea: number =
      await this._repositorioFazenda.ObterAreaTotalDeTodasAsFazenda();
    const fazendasPorEstado: IFazendasAgrupadasPorEstado[] =
      await this._repositorioFazenda.ObterFazendasPorEstado();
    const fazendasPorCultura: IFazendasPorCultura[] =
      await this._repositorioCultura.ObterTotalDeFazendasPorCulturas();
    const totalAreaAgricultavel: number =
      await this._repositorioFazenda.ObterTotalAgricultavelDeTodasAsFazendas();
    const totalAreaVegetacao: number =
      await this._repositorioFazenda.ObterTotalVegetacaoDeTodasAsFazendas();

    return {
      totalFazenda,
      totalArea,
      fazendasPorEstado,
      fazendasPorCultura,
      totalAreaAgricultavel,
      totalAreaVegetacao,
    };
  }
  //#endregion
}
