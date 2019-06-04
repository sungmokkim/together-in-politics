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

const fetchFreeboardPosts = callback => {
  // Connection URL

  const url = `mongodb://${user}:${mongopw}@${host}:${port}`;

  // Database Name
  const dbName = `${database}`;

  const client = new MongoClient(url, { useNewUrlParser: true });

  client.connect(err => {
    assert.equal(null, err);

    const db = client.db(dbName);
    const collection = db.collection(`${freeBoardCollection}`);
    collection
      .find({})
      .project({
        user: 1,
        _id: 1,
        text: 1,
        comments: 1,
        ip: 1,
        post_date: 1,
        admin: 1
      })
      .sort({ _id: -1 })

      .toArray((err, result) => {
        assert.equal(null, err);
        callback(result);
      });
  });
};

export default fetchFreeboardPosts;
