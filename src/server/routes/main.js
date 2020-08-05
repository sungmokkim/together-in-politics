import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('welcome to TIP');
});

export default router;
