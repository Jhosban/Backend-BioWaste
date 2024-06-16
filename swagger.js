import swaggerAutogen from 'swagger-autogen';
import * as index from './src/index.js';

const doc = {
    info: {
        title: 'My Aplicacion API',
        description: 'Descripcion que quieras ingresar'
    },
    host: "localhost:3000",
    shemes: ['http']
};

const outputFile = './swagger-output.json'
const endpointsFile = ['./src/routes/UserRoutes.js', './src/routes/AdminRoutes.js', './src/routes/ResidenceRoutes.js', './src/routes/PlansRoutes.js']

swaggerAutogen(outputFile, endpointsFile, doc)
    .then(() => {
        index;
    });