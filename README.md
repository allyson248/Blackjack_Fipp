# FIPP21 — backend inicial

Backend inicial da atividade de Fullstack 2: uma plataforma de Blackjack (21) com Express e Socket.IO.

## Requisitos

- Node.js 20 ou superior
- MySQL (para a próxima etapa; ainda não conectado)

## Começar

```powershell
Copy-Item .env.example .env
npm install
npm run dev
```

Servidor: `http://localhost:5000`

## Endpoints e eventos disponíveis

- `GET /api/health` — verifica se a API está ativa.
- `POST /api/jogo/pontuacao` — calcula a pontuação de uma mão; os ases valem 11 ou 1 conforme necessário.
- Socket.IO: envie `sala:entrar` com o código da sala; os clientes recebem `sala:participantes` com a quantidade conectada.

Exemplo de corpo para calcular pontuação:

```json
{ "cartas": ["ACE", "KING"] }
```

Os nomes dos valores seguem a resposta da Deck of Cards API (`ACE`, `KING`, `QUEEN`, `JACK`, `2` a `10`).

## Banco de dados

O modelo fornecido está em `database/sql-fipp21.sql`. As rotas ainda não persistem dados. Cadastro/login, JWT, Swagger, integração com MySQL e fluxo completo das rodadas serão implementados nas próximas etapas.
