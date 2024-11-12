import { DashboardController } from "controladores/DashboardController";
import { Router } from "express";

const router = Router();

/**
* @swagger
* /dashboard/resumo:
*   get:
*     summary: Obtem um resumo total do dashboard
*     tags:
*       - Dashboard
*     responses:
*       200:
*         description: Resumo total obtido com sucesso.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 Sucesso:
*                   type: boolean
*                   example: true
*                 Mensagem:
*                   type: string
*                   example: ""
*                 Data:
*                   type: object
*                   properties:
*                     totalFazendas:
*                       type: integer
*                       example: 10
*                       description: Total de fazendas cadastradas
*                     totalArea:
*                       type: number
*                       example: 1500.5
*                       description: Total de hectares
*                     fazendasPorEstado:
*                       type: array
*                       items:
*                         type: object
*                         properties:
*                           estado:
*                             type: string
*                             example: "SP"
*                           quantidade:
*                             type: integer
*                             example: 5
*                     fazendasPorCultura:
*                       type: array
*                       items:
*                         type: object
*                         properties:
*                           cultura:
*                             type: string
*                             example: "Soja"
*                           quantidade:
*                             type: number
*                             example: 700.5
*                     usoSolo:
*                       type: object
*                       properties:
*                         totalAreaAgricultavel:
*                           type: number
*                           example: 1000
*                         totalAreaVegetacao:
*                           type: number
*                           example: 500
*       400:
*         description: Erro ao obter o resumo total.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 Sucesso:
*                   type: boolean
*                   example: false
*                 Mensagem:
*                   type: string
*                   example: "Não foi possivel obter os dados"
*                 Data:
*                   type: object
*                   nullable: true
*                   example: null
*/

router.get("/resumo", DashboardController.ObterResumoTotal);
export default router;
