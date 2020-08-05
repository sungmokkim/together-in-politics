import freeboardService from '../services/freeboard';

const getFreeboards = async () => {
  const freeboards = await freeboardService.getFreeboards();

  return freeboards;
};

const getHotPosts = async () => {
  const hotPosts = await freeboardService.getHotPosts();

  return hotPosts;
};

const createFreeboard = async (req) => {
  const freeboard = await freeboardService.createFreeboard(req);

  return freeboard;
};

const updateComment = async (inputId, req) => {
  const { comment, userName, password } = req.body;

  const data = {
    inputId, comment, userName, password,
  };

  const newComment = await freeboardService.updateComment(req, data);

  return newComment;
};

const getComments = async (postId) => {
  const comments = await freeboardService.getComments(postId);

  return comments;
};

export default {
  getFreeboards,
  createFreeboard,
  getHotPosts,
  updateComment,
  getComments,
};
