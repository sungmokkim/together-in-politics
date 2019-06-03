const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
import env from '../../helpers/serverEnv';

const {
  host,
  port,
  user,
  mongopw,
  database,
  freeBoardCollection
} = env.mongodb;

const insertFreeboardPost = (req, callback) => {
  // Connection URL

  const { text, userName, password } = req.body;
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  const url = `mongodb://${user}:${mongopw}@${host}:${port}`;

  // Database Name
  const dbName = `${database}`;

  const client = new MongoClient(url, { useNewUrlParser: true });

  client.connect(err => {
    assert.equal(null, err);

    const db = client.db(dbName);
    const collection = db.collection(`${freeBoardCollection}`);
    collection.insertOne(
      {
        user: userName,
        password,
        text,
        ip,
        comments: [],
        post_date: new Date()
      },
      (err, result) => {
        assert.equal(null, err);
        callback(result);
      }
    );
  });
};

export default insertFreeboardPost;
