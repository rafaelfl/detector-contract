import fs from 'fs';
import path from 'path';
import createError from 'http-errors';
import express from 'express';

import swaggerUi from 'swagger-ui-express';
import yaml from 'yaml';

import routeModules from './routes';
import { Exception } from './helpers/exception';
import { messages } from './helpers/constants';

const app = express();
const { NOT_FOUND } = messages;

const file = fs.readFileSync(path.resolve(__dirname, '../docs/swagger/detector-contract.yaml'), 'utf8');
const swaggerDocument = yaml.parse(file);

// TODO: Let's avoid any CORS issue for now ;)
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// register modules
routeModules(app);

// define a route for the swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// catch 404 and forward to exception handler
app.use((req, res, next) => next(createError(404, NOT_FOUND)));

// exception handlers
app.use(Exception.handleError());

export default app;
