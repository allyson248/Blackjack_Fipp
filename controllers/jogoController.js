import BaralhoRepository from '../repositories/baralhoRepository.js';
import TurnoEntity from '../entities/turnoEntity.js';

export default class JogoController {
  #repoBaralho;

  constructor() {
    this.#repoBaralho = new BaralhoRepository();
  }

  async criarBaralho(_req, res) {
    try {
      const baralho = await this.#repoBaralho.criarBaralho();
      return res.status(201).json(baralho);
    } catch (erro) {
      console.error(erro);
      return res.status(502).json({ msg: erro.message || 'Falha ao acessar o serviço de baralho.' });
    }
  }

  async comprarCartas(req, res) {
    try {
      const { codigo } = req.params;
      const { quantidade } = req.body ?? {};
      const cartas = await this.#repoBaralho.comprarCartas(codigo, quantidade);
      return res.status(200).json(cartas);
    } catch (erro) {
      const status = erro.message.startsWith('A quantidade') ? 400 : 502;
      console.error(erro);
      return res.status(status).json({ msg: erro.message || 'Falha ao comprar cartas.' });
    }
  }

  calcularPontuacao(req, res) {
    try {
      const { cartas } = req.body ?? {};
      if (!Array.isArray(cartas) || !cartas.every((carta) => typeof carta === 'string')) {
        return res.status(400).json({ msg: 'Envie cartas como uma lista de valores, por exemplo ["ACE", "KING"].' });
      }
      const turno = new TurnoEntity(cartas);
      return res.status(200).json(turno);
    } catch (erro) {
      return res.status(400).json({ msg: erro.message });
    }
  }
}
