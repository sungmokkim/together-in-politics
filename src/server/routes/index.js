import mainRouter from './main';
import infoRouter from './info';
import freeboardRouter from './freeboard';

const useRoutes = (app) => {
  app.use('/api', mainRouter);
  app.use('/api/info', infoRouter);
  app.use('/api/freeboard', freeboardRouter);
};

export default useRoutes;
