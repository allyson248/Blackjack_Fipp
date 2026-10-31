export default class CartaEntity {
  #codigo;
  #imagem;
  #valor;
  #naipe;

  constructor({ code = null, image = null, value, suit = null }) {
    this.#codigo = code;
    this.#imagem = image;
    this.#valor = value;
    this.#naipe = suit;
  }

  get codigo() { return this.#codigo; }
  get imagem() { return this.#imagem; }
  get valor() { return this.#valor; }
  get naipe() { return this.#naipe; }

  get valorPontuacao() {
    if (this.#valor === 'ACE') return 11;
    if (['KING', 'QUEEN', 'JACK'].includes(this.#valor)) return 10;
    const numero = Number(this.#valor);
    if (Number.isInteger(numero) && numero >= 2 && numero <= 10) return numero;
    throw new Error(`Valor de carta inválido: ${this.#valor}`);
  }

  toJSON() {
    return { codigo: this.#codigo, imagem: this.#imagem, valor: this.#valor, naipe: this.#naipe };
  }
}
