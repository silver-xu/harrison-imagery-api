import * as bodyParser from 'body-parser';
import * as express from 'express';

import { authMiddleware } from './middlewares/auth';
import { errorHandlerMiddleware } from './middlewares/errorHandler';
import { errorLoggerMiddleware } from './middlewares/errorLogger';
import { httpLoggerMiddleware } from './middlewares/httpLogger';
import { addInsecureRoutes } from './routes';
import { addSecureRoutes } from './secureRoutes';

const app = express();
const port = 8080;

app.use(bodyParser.json());
addInsecureRoutes(app);
app.use(authMiddleware);
app.use(httpLoggerMiddleware);
addSecureRoutes(app);
app.use(errorLoggerMiddleware);
app.use(errorHandlerMiddleware);

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
