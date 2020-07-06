import { APIGatewayProxyHandler } from 'aws-lambda';
import * as awsServerlessExpress from 'aws-serverless-express';

import { config } from './config';
import app from './infra/http/app';

const server = awsServerlessExpress.createServer(app);
const runningInLambda = process.env['LAMBDA_ENV'] === 'true';
const { NODE_ENV } = process.env;
const { httpPort } = config[NODE_ENV];

export const handler: APIGatewayProxyHandler = (event, context): void => {
  awsServerlessExpress.proxy(server, event, context);
};

if (!runningInLambda) {
  app.listen(httpPort, () => {
    console.log(`Harrison.ai Imagery API started at http://localhost:${httpPort}`);
  });
}
