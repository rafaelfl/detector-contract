import { Application } from 'express';
import { API_VERSION } from '../helpers/constants';

import scanRoute from './scan';
import suggestionRoute from './suggestion';

/*
 * Routes registration
 */
const routes = (app: Application) => {
  const apiPrefix = `/api/${API_VERSION}`;

  app.use(apiPrefix, scanRoute);
  app.use(apiPrefix, suggestionRoute);

  return app;
};

export default routes;
