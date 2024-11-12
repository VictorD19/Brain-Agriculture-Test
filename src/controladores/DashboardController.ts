import { DashboardService } from "@servicos/DashboardService";
import { RespostaPadrao } from "@utilidades/RespostaPadrao";
import { Request, Response } from "express";

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Endpoints relacionados ao Dashboard
 */

export class DashboardController {
  //#region Metodos Publicos
  static async  ObterResumoTotal(request: Request, response: Response): Promise<void> {
    try {
      const servicoDashboard = new DashboardService();
      const ObterResumoTotal = await servicoDashboard.ObteResumoDados();
      response.status(200).json(new RespostaPadrao(ObterResumoTotal));
    } catch (error) {
      response
        .status(400)
        .json(new RespostaPadrao(false, "Não foi possivel obter os dados"));
    }
  }
  //#endregion
}
