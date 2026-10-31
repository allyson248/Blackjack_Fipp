import CartaEntity from '../entities/cartaEntity.js';

const API_BARALHO = 'https://deckofcardsapi.com/api/deck';

export default class BaralhoRepository {
  async criarBaralho() {
    const resposta = await fetch(`${API_BARALHO}/new/shuffle/?deck_count=1`);
    const dados = await resposta.json();
    if (!resposta.ok || !dados.success) throw new Error('Não foi possível criar o baralho.');
    return { codigo: dados.deck_id, restante: dados.remaining };
  }

  async comprarCartas(codigo, quantidade) {
    if (!Number.isInteger(quantidade) || quantidade < 1 || quantidade > 52) {
      throw new Error('A quantidade deve ser um número inteiro entre 1 e 52.');
    }
    const resposta = await fetch(`${API_BARALHO}/${encodeURIComponent(codigo)}/draw/?count=${quantidade}`);
    const dados = await resposta.json();
    if (!resposta.ok || !dados.success) throw new Error('Não foi possível comprar cartas desse baralho.');
    return {
      codigo: dados.deck_id,
      restante: dados.remaining,
      cartas: dados.cards.map((carta) => new CartaEntity(carta))
    };
  }
}
