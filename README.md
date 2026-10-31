# FIPP21 — backend inicial

API REST para a plataforma multiplayer de Blackjack da atividade de Fullstack 2. A organização segue o padrão usado no projeto de locação: `routes` encaminham para `controllers`, que usam `entities` e `repositories`; o acesso MySQL fica em `database`.

## Requisitos e início

- Node.js 20 ou superior
- MySQL local (quando começarmos a persistir dados)

```powershell
Copy-Item .env.example .env
npm install
npm run dev
```

O backend inicia em `http://localhost:5000`. A documentação Swagger fica em `/docs`.

## Funcionalidades iniciais

- `GET /health` — verifica a API.
- `POST /jogo/baralho` — cria e embaralha um baralho pela Deck of Cards API.
- `POST /jogo/baralho/:codigo/comprar` com `{ "quantidade": 2 }` — compra cartas daquele baralho.
- `POST /jogo/pontuacao` com `{ "cartas": ["ACE", "KING"] }` — calcula a pontuação; o Ás vale 11 ou 1 para evitar estouro quando possível.
- Socket.IO: evento `sala:entrar` com o código da sala; clientes recebem `sala:participantes` com a contagem conectada.

## Banco

O SQL fornecido está em `database/sql-fipp21.sql`. A classe `database/database.js` lê a conexão do `.env`; não há credenciais de banco fixas no código. O middleware JWT já está preparado no padrão do projeto de referência, mas ainda não foi aplicado a rotas porque o fluxo de cadastro/login será implementado na próxima etapa. Persistência de salas e rodadas e regras completas do dealer também ficam para as próximas etapas.

