import mongoose from 'mongoose';

const freeboardSchema = new mongoose.Schema({
  user: String,
  password: String,
  text: String,
  ip: String,
  comments: Array,
  post_date: Date,
  admin: Boolean,
});

const freeboardModel = mongoose.model('Freeboard', freeboardSchema);

export default freeboardModel;
