import express from 'express';
import infoController from '../controllers/info';
import contollerHandler from '../handlers/controller';

const router = express.Router();

router.get('/latest-date',
  contollerHandler(infoController.getLatestDate, (req, res, next) => []));

router.get('/ranking',
  contollerHandler(infoController.getRanking, (req, res, next) => [req.query]));

router.get('/today-indicator',
  contollerHandler(infoController.getTodayIndicator, (req, res, next) => [req.query]));

// TODO: Make this routes RESTful. (Use GET instead of POST)
router.post('/max-values',
  contollerHandler(infoController.getMaxValues, (req, res, next) => [req.body]));

// TODO: Make this routes RESTful. (Use GET instead of POST)
router.post('/dashboard-data',
  contollerHandler(infoController.getDashboardData, (req, res, next) => [req.body]));

// TODO: Make this routes RESTful. (Use GET instead of POST)
router.post('/keyword-data',
  contollerHandler(infoController.getKeywordData, (req, res, next) => [req.body]));

router.get('/bubble-chart-data',
  contollerHandler(infoController.getBubbleChartData, (req, res, next) => [req.query]));

export default router;
