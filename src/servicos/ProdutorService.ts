import { Transaction } from "sequelize";
import { ProdutorRepositorio } from "@repositorios/ProdutorRepositorio";
import {
  IProdutorAtributosCriacao,
  ProdutorModel,
} from "@modelos/ProdutorModel";
import { Validacoes } from "@utilidades/Validacoes";
import { ServicoException } from "@utilidades/Error";
import { FazendaCulturaService } from "@servicos/FazendaCulturaService";
import { FazendaService } from "@servicos/FazendaService";
import { FazendaModel } from "@modelos/FazendaModel";
export class ProdutorService {
  //#region Atributos
  private readonly _repositorioProdutor: ProdutorRepositorio;
  //#endregion

  //#region Construtores
  constructor() {
    this._repositorioProdutor = new ProdutorRepositorio(ProdutorModel);
  }
  //#endregion

  //#region Metodos Publicos

  async BuscarProdutorPorCPF_CNPJ(
    cpf_cnpj: string
  ): Promise<ProdutorModel | null> {
    return await this._repositorioProdutor.BuscarPorCPF_CNPJ(cpf_cnpj);
  }

  async ObterInformacoesPorId(id: number): Promise<unknown> {
    const produtor = await this._repositorioProdutor.BuscarPorCodigo(id);
    if (!produtor) {
      throw new ServicoException("Usuário não encontrado", 404);
    }

    const servicoFazendas = new FazendaService();

    const fazendasDoProdutor = await servicoFazendas.ObterFazendasDoProdutor(
      id
    );

    return {
      id: produtor.Id,
      nome: produtor.Nome,
      cpf_cnpj: produtor.CpfCnpj,
      fazendas: fazendasDoProdutor.map((fazenda: FazendaModel) => ({
        id: fazenda.Id,
        nome: fazenda.Nome,
        areaTotal: fazenda.AreaTotal,
        areaAgricultavel: fazenda.AreaAgricultavel,
        areaVegetacao: fazenda.AreaVegetacao,
        estado: fazenda.Estado,
        cidade: fazenda.Cidade,
        culturas: fazenda?.CulturasVinculadas?.map((cultura) => ({
          id: cultura.Id,
          nome: cultura.Nome,
        })),
      })),
    };
  }

  async Criar(
    produtor: IProdutorAtributosCriacao,
    transaction?: Transaction
  ): Promise<ProdutorModel> {
    if (!Validacoes.ValidarCPFCNPJValido())
      throw new ServicoException(`CPF ou CNPJ invalido`);
    return await this._repositorioProdutor.Inserir(produtor, transaction);
  }

  async Remover(id: number, transacao?: Transaction): Promise<void> {
    if (!(await this._repositorioProdutor.VerificarUsuarioExistentePorId(id)))
      throw new ServicoException("Produtor não encontrado", 404);

    const servicoFazendaCultura = new FazendaCulturaService();
    await servicoFazendaCultura.RemoverPorProdutor(id, transacao);

    const servicoFazenda = new FazendaService();
    await servicoFazenda.RemoverFazendasPorIdProdutor(id, transacao);

    this._repositorioProdutor.Deletar(id);
  }

  async Atualizar(
    id: number,
    produtor: IProdutorAtributosCriacao,
    transacao?: Transaction
  ): Promise<void> {
    if (!(await this._repositorioProdutor.VerificarUsuarioExistentePorId(id)))
      throw new ServicoException("Produtor não encontrado", 404);

    this._repositorioProdutor.Atualizar(id, produtor, transacao);
  }

  //#endregion
}