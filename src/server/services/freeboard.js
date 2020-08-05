import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import dateAndTime from 'date-and-time';
import freeboardModel from '../models/freeboard';

const getFreeboards = async () => {
  const freeboards = await freeboardModel.aggregate([
    {
      $project: {
        _id: 1,
        user: 1,
        text: 1,
        ip: 1,
        post_date: {
          $dateToString: {
            format: '%Y.%m.%d %H:%M:%S',
            date: '$post_date',
            timezone: 'Asia/Seoul',
          },
        },
        admin: 1,
        comments: { $size: '$comments' },
      },
    },
  ])
    .sort({ _id: -1 });

  return freeboards;
};

const getHotPosts = async () => {
  const newTime = dateAndTime.addDays(new Date(), -7);

  const hotPosts = await freeboardModel.aggregate([
    { $match: { post_date: { $gt: newTime }, admin: false } },
    {
      $project: {
        _id: 1,
        user: 1,
        text: 1,
        ip: 1,
        post_date: {
          $dateToString: {
            format: '%Y.%m.%d %H:%M:%S',
            date: '$post_date',
            timezone: 'Asia/Seoul',
          },
        },
        admin: 1,
        comments: { $size: '$comments' },
      },
    },
  ])
    .sort({ comments: -1 })
    .limit(2);

  return hotPosts;
};

const createFreeboard = async (req) => {
  const { text, userName, password } = req.body;
  const ip = req.headers['x-real-ip'] || req.connection.remoteAddress;

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  // I know this isn't the safest way to compare password. This is just for a demo purpose
  const adminHash = process.env.ADMIN_HASH;

  const isAdmin = await bcrypt.compare(password, adminHash);

  const newPost = await freeboardModel.create(
    {
      user: userName,
      password: hash,
      text,
      ip,
      comments: [],
      post_date: new Date(),
      admin: isAdmin,
    },
  );

  return newPost;
};

const updateComment = async (req, data) => {
  const {
    comment, userName, password, inputId,
  } = data;
  const ip = req.headers['x-real-ip'] || req.connection.remoteAddress;

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  // I know this isn't the safest way to compare password. This is just for a demo purpose
  const adminHash = process.env.ADMIN_HASH;

  const isAdmin = await bcrypt.compare(password, adminHash);

  const newComment = await freeboardModel.updateOne(
    {
      _id: inputId,
    },

    {
      $push: {
        comments: {
          _id: mongoose.Types.ObjectId(),
          user: userName,
          password: hash,
          ip,
          comment,
          post_date: new Date(),
          admin: isAdmin,
        },
      },
    },
  );

  return newComment;
};

const getComments = async (postId) => {
  const comments = await freeboardModel.aggregate([
    {
      $match: { _id: mongoose.Types.ObjectId(postId) },
    },
    {
      $project: {
        comments: {
          $map: {
            input: '$comments',
            in: {
              _id: '$$this._id',
              user: '$$this.user',
              ip: '$$this.ip',
              comment: '$$this.comment',
              post_date: {
                $dateToString: {
                  format: '%Y.%m.%d %H:%M:%S',
                  date: '$$this.post_date',
                  timezone: 'Asia/Seoul',
                },
              },
              admin: '$$this.admin',
            },
          },
        },
      },
    },
  ])
    .sort({ _id: -1 });

  return comments;
};

export default {
  getFreeboards,
  createFreeboard,
  getHotPosts,
  updateComment,
  getComments,
};
