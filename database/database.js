import mysql from 'mysql2/promise';

export default class Database {
  #conexao;

  constructor() {
    this.#conexao = mysql.createPool({
      host: process.env.DB_HOST ?? 'localhost',
      port: Number(process.env.DB_PORT ?? 3306),
      database: process.env.DB_NAME ?? 'fipp21',
      user: process.env.DB_USER ?? 'root',
      password: process.env.DB_PASSWORD ?? '',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
  }

  async ExecutaComando(sql, valores = []) {
    const [linhas] = await this.#conexao.execute(sql, valores);
    return linhas;
  }

  async ExecutaComandoNonQuery(sql, valores = []) {
    const [resultado] = await this.#conexao.execute(sql, valores);
    return resultado.affectedRows > 0;
  }

  async ExecutaComandoLastInserted(sql, valores = []) {
    const [resultado] = await this.#conexao.execute(sql, valores);
    return resultado.insertId;
  }
}
