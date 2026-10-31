import { Router } from 'express';
import { calcularPontuacao } from '../game/pontuacao.js';

const router = Router();

router.get('/health', (_req, res) => {
  res.json({ status: 'ok', projeto: 'FIPP21' });
});

router.post('/jogo/pontuacao', (req, res) => {
  const { cartas } = req.body ?? {};

  if (!Array.isArray(cartas) || cartas.length === 0 || !cartas.every((carta) => typeof carta === 'string')) {
    return res.status(400).json({ erro: 'Envie cartas como uma lista de valores, por exemplo ["ACE", "KING"].' });
  }

  try {
    return res.json(calcularPontuacao(cartas));
  } catch (erro) {
    return res.status(400).json({ erro: erro.message });
  }
});

export default router;
