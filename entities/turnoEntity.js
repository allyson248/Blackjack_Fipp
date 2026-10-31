import CartaEntity from './cartaEntity.js';

export default class TurnoEntity {
  #cartas;
  #pontuacao;

  constructor(cartas) {
    if (!Array.isArray(cartas) || cartas.length === 0) {
      throw new Error('Informe ao menos uma carta.');
    }
    this.#cartas = cartas.map((carta) => carta instanceof CartaEntity ? carta : new CartaEntity({ value: carta }));
    this.#pontuacao = this.calcularPontuacao();
  }

  get cartas() { return this.#cartas; }
  get pontuacao() { return this.#pontuacao; }
  get estourou() { return this.#pontuacao > 21; }

  calcularPontuacao() {
    let total = 0;
    let ases = 0;
    for (const carta of this.#cartas) {
      total += carta.valorPontuacao;
      if (carta.valor === 'ACE') ases += 1;
    }
    while (total > 21 && ases > 0) {
      total -= 10;
      ases -= 1;
    }
    return total;
  }

  toJSON() {
    return { cartas: this.#cartas, pontuacao: this.#pontuacao, estourou: this.estourou };
  }
}
