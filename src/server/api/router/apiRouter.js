import express from 'express';

import fetchTodayIndicator from '../fetch/todayIndicator';
import fetchTodayRankings from '../fetch/ranking';
import fetchDashboardData from '../fetch/dashboardData';
import fetchLatestDate from '../fetch/latestDate';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('welcome');
});

router.post('/today_indicator', (req, res) => {
  fetchTodayIndicator(req.body, results => {
    res.json(results);
  });
});

router.post('/ranking', (req, res) => {
  fetchTodayRankings(req.body, results => {
    res.json(results);
  });
});

router.get('/latest_date', (req, res) => {
  fetchLatestDate(results => {
    res.json(results);
  });
});

router.post('/dashboard_data', (req, res) => {
  fetchLatestDate(latest => {
    fetchDashboardData(latest, req.body, results => {
      res.json(results);
    });
  });
});

router.get('*', (req, res) => {
  res.send('welcome!');
});
export default router;
