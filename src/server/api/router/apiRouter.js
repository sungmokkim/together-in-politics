import express from 'express';

import fetchTodayIndicator from '../fetch/todayIndicator';
import fetchTodayRankings from '../fetch/ranking';
import fetchDashboardData from '../fetch/dashboardData';
import fetchLatestDate from '../fetch/latestDate';
import fetchPeriodData from '../fetch/periodData';
import fetchFreeboardPosts from '../fetch/freeboardPosts';
import insertFreeboardPost from '../insert/freeboardPost';

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

router.post('/period_data', (req, res) => {
  fetchPeriodData(req.body, results => {
    res.json(results);
  });
});

router.post('/insert_freeboard', (req, res) => {
  insertFreeboardPost(req, rs => {
    res.json(rs);
  });
});

router.get('/freeboard', (req, res) => {
  fetchFreeboardPosts(rs => {
    res.json(rs);
  });
});

router.get('*', (req, res) => {
  res.send('welcome!');
});
export default router;
