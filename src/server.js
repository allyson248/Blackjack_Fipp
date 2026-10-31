import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import api from './routes/api.js';
import configurarSockets from './sockets/index.js';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: { origin: process.env.CLIENT_ORIGIN ?? 'http://localhost:3000' }
});

app.use(cors({ origin: process.env.CLIENT_ORIGIN ?? 'http://localhost:3000' }));
app.use(express.json());
app.use('/api', api);
configurarSockets(io);

const port = Number(process.env.PORT ?? 5000);
server.listen(port, () => console.log(`FIPP21 backend em http://localhost:${port}`));
