// swagger.js
import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'ng-pokedex-server API',
    description: 'Playmaker Pokedex API Documentation',
  },
  host: 'localhost:4001',
  basePath: '/api/v1/',
  schemes: ['https'],
};

const outputFile = './swagger-output.json';
const routes = ['../app.mjs'];

swaggerAutogen()(outputFile, routes, doc);
