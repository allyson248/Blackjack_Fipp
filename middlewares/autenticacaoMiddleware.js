import jwt from 'jsonwebtoken';

export default class AutenticacaoMiddleware {
  #segredo;

  constructor() {
    this.#segredo = process.env.JWT_SECRET;
  }

  gerarJWT(id, nome, email) {
    if (!this.#segredo || this.#segredo === 'troque-por-uma-chave-local') {
      throw new Error('Configure JWT_SECRET no arquivo .env antes de gerar tokens.');
    }
    return jwt.sign({ id, nome, email }, this.#segredo, { expiresIn: '8h' });
  }

  validar(req, res, next) {
    const token = req.cookies?.['token-fipp21'];
    if (!token) return res.status(401).json({ msg: 'Token inexistente.' });

    try {
      req.usuario = jwt.verify(token, this.#segredo);
      return next();
    } catch {
      return res.status(401).json({ msg: 'Token inválido ou expirado.' });
    }
  }
}
