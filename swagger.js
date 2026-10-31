import 'dotenv/config';
import swaggerAutogen from 'swagger-autogen';

const documento = {
  info: {
    title: 'FIPP21 API',
    description: 'API da plataforma multiplayer do jogo 21 para Fullstack 2.'
  },
  host: `localhost:${process.env.PORT ?? 5000}`,
  schemes: ['http']
};

const arquivoSaida = './swagger-output.json';
const rotas = ['./server.js'];

swaggerAutogen({ openapi: '3.0.0' })(arquivoSaida, rotas, documento)
  .then(async () => {
    await import('./server.js');
  });
