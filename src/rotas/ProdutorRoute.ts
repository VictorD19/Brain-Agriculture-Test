import { ProdutorController } from "controladores/ProdutorController";
import { Router } from "express";
const router: Router = Router();

/**
 * @swagger
 * /produtor/{id}:
 *   get:
 *     summary: Obtem informações de um produtor por ID
 *     tags:
 *       - Produtor
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do produtor
 *     responses:
 *       200:
 *         description: Informações do produtor obtidas com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 nome:
 *                   type: string
 *                   example: "João da Silva"
 *                 cpf_cnpj:
 *                   type: string
 *                   example: "12345678901"
 *                 fazendas:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       nome:
 *                         type: string
 *                         example: "Fazenda Bela Vista"
 *                       areaTotal:
 *                         type: number
 *                         example: 150.5
 *                       areaAgricultavel:
 *                         type: number
 *                         example: 100.5
 *                       areaVegetacao:
 *                         type: number
 *                         example: 50
 *                       estado:
 *                         type: string
 *                         example: "SP"
 *                       cidade:
 *                         type: string
 *                         example: "Ribeirão Preto"
 *                       culturas:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               example: 1
 *                             nome:
 *                               type: string
 *                               example: "Soja"
 *       404:
 *         description: Usuário não encontrado
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
 *                   example: "Usuário não encontrado"
 *                 Data:
 *                   type: object
 *                   nullable: true
 *                   example: null
 */
router.get("/:id", ProdutorController.BuscarPorCodigo);

/**
 * @swagger
 * /produtor/inserir:
 *   post:
 *     summary: Insere um novo produtor
 *     tags:
 *       - Produtor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome do produtor
 *                 example: "João da Silva"
 *               cpf_cnpj:
 *                 type: string
 *                 description: CPF ou CNPJ do produtor
 *                 example: "12345678901"
 *               fazendas:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     nome:
 *                       type: string
 *                       example: "Fazenda Bela Vista"
 *                     estado:
 *                       type: string
 *                       example: "SP"
 *                     cidade:
 *                       type: string
 *                       example: "Ribeirão Preto"
 *                     areaTotal:
 *                       type: number
 *                       example: 150.5
 *                     areaAgricultavel:
 *                       type: number
 *                       example: 100.5
 *                     areaVegetacao:
 *                       type: number
 *                       example: 50
 *                     culturas:
 *                       type: array
 *                       items:
 *                         type: integer
 *                         example: 1
 *     responses:
 *       201:
 *         description: Produtor criado com sucesso
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
 *                   example: "Usuário criado com sucesso"
 *       400:
 *         description: Erro na criação do produtor
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
 *                   example: "Ocorreu um erro ao tentar criar o usuario"
 *                 Data:
 *                   type: object
 *                   nullable: true
 *                   example: null
 */

router.post("/inserir", ProdutorController.Inserir);

/**
 * @swagger
 * /produtor/atualizar:
 *   patch:
 *     summary: Atualiza um produtor existente
 *     tags:
 *       - Produtor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: ID do produtor
 *                 example: 1
 *               nome:
 *                 type: string
 *                 description: Nome do produtor
 *                 example: "João da Silva"
 *               cpf_cnpj:
 *                 type: string
 *                 description: CPF ou CNPJ do produtor
 *                 example: "12345678901"
 *               fazendas:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       example: 1
 *                     nome:
 *                       type: string
 *                       example: "Fazenda Nova"
 *                     estado:
 *                       type: string
 *                       example: "MG"
 *                     cidade:
 *                       type: string
 *                       example: "Uberlândia"
 *                     areaTotal:
 *                       type: number
 *                       example: 200
 *                     areaAgricultavel:
 *                       type: number
 *                       example: 150
 *                     areaVegetacao:
 *                       type: number
 *                       example: 50
 *     responses:
 *       200:
 *         description: Produtor atualizado com sucesso
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
 *                   example: "Registro atualizado com sucesso"
 *                 Data:
 *                   type: object
 *                   nullable: true
 *                   example: null
 *       404:
 *         description: Produtor não encontrado
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
 *                   example: "Produtor não encontrado"
 */
router.patch("/atualizar", ProdutorController.Atualizar);

/**
 * @swagger
 * /produtor/remover/{id}:
 *   delete:
 *     summary: Remove um produtor por ID
 *     tags:
 *       - Produtor
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do produtor a ser removido
 *     responses:
 *       200:
 *         description: Produtor removido com sucesso
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
 *                   example: "Produtor removido com sucesso"
 *       404:
 *         description: Produtor não encontrado
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
 *                   example: "Produtor não encontrado"
 */
router.delete("/remover/:id", ProdutorController.Remover);

export default router;
