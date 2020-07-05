import * as bodyParser from 'body-parser';
import * as express from 'express';

import { authMiddleware } from './middlewares/auth';
import { errorHandlerMiddleware } from './middlewares/errorHandler';
import { loggerMiddleware } from './middlewares/logger';
import { addHealthRoutes } from './routes/health';
import { addSecureRoutes } from './secureRoutes';

const app = express();
const port = 8080;

app.use(bodyParser.json());

addHealthRoutes(app);
app.use(authMiddleware);
addSecureRoutes(app);
app.use(loggerMiddleware);
app.use(errorHandlerMiddleware);

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
