import * as swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Harrison.ai Imagery API',
      description: 'Harrison.ai Imagery API to support AI powered disease image classifications',
      version: '1.0.0',
      license: {
        name: 'MIT',
        url: 'https://choosealicense.com/licenses/mit/',
      },
      contact: {
        name: 'Silver Xu',
        url: 'https://github.com/silver-xu/harrison-api',
        email: 'me@silverxu.com',
      },
    },
  },
  basePath: '/',
  apis: ['./dist/infra/http/secureRoutes/*.js'],
};

export const swaggerSpec = swaggerJSDoc(options);
