import mongoose from 'mongoose';

const infoSchema = new mongoose.Schema({
  dates: String,
  years: String,
  months: String,
  weeks: Number,
  name: String,
  w_count: Number,
  m_count: Number,
  anti_count: Number,
  anti_ratio: Number,
  femi_count: Number,
  femi_ratio: Number,
  popularity: Number,
  problem_count: Number,
  problem_ratio: Number,
  words: Array,
});

const infoModel = mongoose.model('tip_info', infoSchema, 'tip_info');

export default infoModel;
