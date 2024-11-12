import { Router } from "express";
import { CulturaController } from "controladores/CulturaController";

const router: Router = Router();
/**
 * @swagger
 * /cultura/{id}:
 *   get:
 *     summary: Obtem informações da cultura
 *     tags:
 *       - Cultura
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da cultura
 *     responses:
 *       200:
 *         description: Dados da cultura.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Sucesso:
 *                   type: boolean
 *                 Mensagem:
 *                   type: string
 *                   example: ""
 *                 Data:
 *                   type: object
 *                   properties:
 *                      Id:
 *                        type: number
 *                        example: 1
 *                      Nome:
 *                        type: string
 *                        example: "soja"
 *       404:
 *         description: Cultura não encontrada.
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
 *                   example: "A cultura que esta tentado consultar não existe"
 *                 Data:
 *                   type: object
 *                   example: null
 *       400:
 *         description: Ocorreu um erro ao tentar buscar cultura
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
 *                   example: "Ocorreu um erro ao tentar buscar cultura"
 *                 Data:
 *                   type: object
 *                   example: null
 */
router.get("/:id", CulturaController.BuscarPorCodigo);

/**
 * @swagger
 * /cultura/inserir:
 *   post:
 *     summary: Insere uma nova cultura
 *     tags:
 *       - Cultura
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome da cultura
 *     responses:
 *       201:
 *         description: Cultura criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Sucesso:
 *                   type: boolean
 *                 Mensagem:
 *                   type: string
 *                   example: "Cultura criada com sucesso"
 *                 Data:
 *                   type: object
 *                   example: null
 *       400:
 *         description: Dados inválidos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Sucesso:
 *                   type: boolean
 *                 Mensagem:
 *                   type: string
 *                   example: "Ocorreu um erro ao tentar criar cultura"
 *                 Data:
 *                   type: object
 *                   example: null
 */
router.post("/inserir", CulturaController.Inserir);

/**
 * @swagger
 * /cultura/atualizar:
 *   patch:
 *     summary: Atualiza uma cultura existente
 *     tags:
 *       - Cultura
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - nome
 *             properties:
 *               id:
 *                 type: integer
 *                 description: ID da cultura
 *                 example: 1
 *               nome:
 *                 type: string
 *                 description: Novo nome da cultura
 *                 example: "Milho"
 *     responses:
 *       200:
 *         description: Cultura atualizada com sucesso
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
 *                   example: "Cultura atualizada com sucesso"
 *                 Data:
 *                   type: object
 *                   nullable: true
 *                   example: null
 *       404:
 *         description: Cultura não encontrada
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
 *                   example: "Cultura não encontrada"
 *                 Data:
 *                   type: object
 *                   nullable: true
 *                   example: null
 *       400:
 *         description: Erro ao tentar atualizar a cultura
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
 *                   example: "Ocorreu um erro ao tentar atualizar a cultura"
 *                 Data:
 *                   type: object
 *                   nullable: true
 *                   example: null
 */

router.patch("/atualizar", CulturaController.Atualizar);

/**
 * @swagger
 * /cultura/remover/{id}:
 *   delete:
 *     summary: Remove uma cultura por Id
 *     tags:
 *       - Cultura
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da cultura a ser removida
 *     responses:
 *       200:
 *         description: Cultura removida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Sucesso:
 *                   type: boolean
 *                 Mensagem:
 *                   type: string
 *                   example: "Cultura removida com sucesso"
 *                 Data:
 *                   type: object
 *                   example: null
 *       404:
 *         description: Cultura não encontrada.
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
 *                   example: "A cultura que você esta tentado remover não existe"
 *                 Data:
 *                   type: object
 *                   example: null
 *       400:
 *         description: Ocorreu um erro ao tentar remover o cultura
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
 *                   example: "Ocorreu um erro ao tentar buscar cultura"
 *                 Data:
 *                   type: object
 *                   example: null
 */
router.delete("/remover/:id", CulturaController.Remover);

export default router;
