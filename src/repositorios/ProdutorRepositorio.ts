import { CulturaModel } from "@modelos/CulturaModel";
import { FazendaModel } from "@modelos/FazendaModel";
import { ProdutorModel } from "@modelos/ProdutorModel";
import { RepositorioBase } from "@repositorios/base/RepositorioBase";

export class ProdutorRepositorio extends RepositorioBase<ProdutorModel> {
  //#region  Metodos Publicos
  async BuscarPorCPF_CNPJ(cpf_cnpj: string): Promise<ProdutorModel | null> {
    return await this._modelo.findOne({
      where: {
        CpfCnpj: cpf_cnpj,
      },
    });
  }
  async VerificarUsuarioExistentePorId(id: number): Promise<boolean> {
    const modelo = await this._modelo.findByPk(id);
    return modelo != null;
  }

  async ObterDetalhesProdutorPorId(idProdutor: number): Promise<ProdutorModel | null>{
    const produtor = await this._modelo.findOne({
      where: { Id: idProdutor },
      include: [
        {
          model: FazendaModel,
          include: [
            {
              model: CulturaModel,
              attributes: ["Id", "Nome"], 
              through: { attributes: [] }, 
            },
          ],
          attributes: ["Id", "Nome"],
          
        },
      ],
    });
    return produtor;
  }
  //#endregion
}
