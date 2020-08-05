import express from 'express';
import freeboardController from '../controllers/freeboard';
import contollerHandler from '../handlers/controller';

const router = express.Router();

router.get('/',
  contollerHandler(freeboardController.getFreeboards, (req, res, next) => []));

router.get('/:id/comments',
  contollerHandler(freeboardController.getComments, (req, res, next) => [req.params.id]));

router.get('/hot-posts',
  contollerHandler(freeboardController.getHotPosts, (req, res, next) => []));

router.post('/',
  contollerHandler(freeboardController.createFreeboard, (req, res, next) => [req]));

router.put('/:id/comment',
  contollerHandler(freeboardController.updateComment, (req, res, next) => [req.params.id, req]));

export default router;
