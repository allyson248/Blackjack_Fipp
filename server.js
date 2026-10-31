import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { createServer } from 'node:http';
import { createRequire } from 'node:module';
import { Server } from 'socket.io';
import jogoRouter from './routes/jogoRouter.js';
import homeRouter from './routes/homeRouter.js';
import configurarSockets from './sockets/socket.js';
import swaggerUi from 'swagger-ui-express';

const require = createRequire(import.meta.url);
const swaggerOutput = require('./swagger-output.json');
const app = express();
const server = createServer(app);
const origemCliente = process.env.CLIENT_ORIGIN ?? 'http://localhost:3000';
const io = new Server(server, { cors: { origin: origemCliente } });

app.use(cors({ origin: origemCliente, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));
app.use('/', homeRouter);
app.use('/jogo', jogoRouter);
configurarSockets(io);

const port = Number(process.env.PORT ?? 5000);
server.listen(port, () => console.log(`FIPP21 backend em http://localhost:${port}`));
