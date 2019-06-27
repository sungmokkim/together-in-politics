import express from 'express';

import fetchTodayIndicator from '../fetch/todayIndicator';
import fetchTodayRankings from '../fetch/ranking';
import fetchDashboardData from '../fetch/dashboardData';
import fetchLatestDate from '../fetch/latestDate';
import fetchPeriodData from '../fetch/periodData';
import fetchFreeboardPosts from '../fetch/freeboardPosts';
import fetchComments from '../fetch/comments';
import fetchBubbleData from '../fetch/bubbleData';
import fetchKeywordsData from '../fetch/keywordsData';
import fetchHotPosts from '../fetch/hotPosts';

import insertFreeboardPost from '../insert/freeboardPost';
import updateNewComment from '../update/newComment';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('welcome');
});

// fetch -----------------------------------------

//      ** indicator
router.post('/today_indicator', (req, res) => {
  fetchTodayIndicator(req.body, results => {
    res.json(results);
  });
});

//      ** ranking
router.post('/ranking', (req, res) => {
  fetchTodayRankings(req.body, results => {
    res.json(results);
  });
});

//      ** latest_data
router.get('/latest_date', (req, res) => {
  fetchLatestDate(results => {
    res.json(results);
  });
});

//      ** dashboard
router.post('/dashboard_data', (req, res) => {
  fetchDashboardData(req.body, results => {
    res.json(results);
  });
});

router.post('/period_data', (req, res) => {
  fetchPeriodData(req.body, results => {
    res.json(results);
  });
});

router.post('/bubble_data', (req, res) => {
  fetchBubbleData(req.body, results => {
    res.json(results);
  });
});

//      ** freeboard
router.post('/comments', (req, res) => {
  fetchComments(req.body, results => {
    res.json(results);
  });
});

router.get('/freeboard', (req, res) => {
  fetchFreeboardPosts(rs => {
    res.json(rs);
  });
});

router.get('/hot_posts', (req, res) => {
  fetchHotPosts(rs => {
    res.json(rs);
  });
});

//      ** keywords
router.post('/keywords', (req, res) => {
  fetchKeywordsData(req.body, results => {
    res.json(results);
  });
});

// insert ------------------------------------------------
router.post('/insert_freeboard', (req, res) => {
  insertFreeboardPost(req, rs => {
    res.json(rs);
  });
});

// update ---------------------------------------------
router.post('/new_comment', (req, res) => {
  updateNewComment(req, rs => {
    res.json(rs);
  });
});

// default ------------------------------------------------

router.get('*', (req, res) => {
  res.send('welcome!');
});

export default router;
