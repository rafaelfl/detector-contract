import { Application } from 'express';
import { API_VERSION } from '../helpers/constants';

import scanRoute from './scan';

/*
 * Routes registration
 */
const routes = (app: Application) => {
  const apiPrefix = `/api/${API_VERSION}`;

  app.use(apiPrefix, scanRoute);

  return app;
};

export default routes;
