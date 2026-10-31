import express from 'express';
import JogoController from '../controllers/jogoController.js';

const router = express.Router();
const controller = new JogoController();

router.post('/baralho', (req, res) => {
  // #swagger.tags = ['Jogo']
  // #swagger.summary = 'Cria e embaralha um baralho novo'
  controller.criarBaralho(req, res);
});

router.post('/baralho/:codigo/comprar', (req, res) => {
  // #swagger.tags = ['Jogo']
  // #swagger.summary = 'Compra cartas do baralho informado'
  // #swagger.parameters['body'] = { in: 'body', schema: { quantidade: 2 } }
  controller.comprarCartas(req, res);
});

router.post('/pontuacao', (req, res) => {
  // #swagger.tags = ['Jogo']
  // #swagger.summary = 'Calcula a pontuação de uma mão considerando o valor flexível do Ás'
  // #swagger.parameters['body'] = { in: 'body', schema: { cartas: ['ACE', 'KING'] } }
  controller.calcularPontuacao(req, res);
});

export default router;
