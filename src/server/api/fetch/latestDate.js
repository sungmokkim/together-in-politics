const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
import env from '../../helpers/serverEnv';

const {
  host,
  port,
  user,
  mongopw,
  database,
  infoCollection
} = env.mongodb_info;

const fetchLatestDate = callback => {
  const url = `mongodb://${user}:${mongopw}@${host}:${port}`;

  // Database Name
  const dbName = `${database}`;

  const client = new MongoClient(url, { useNewUrlParser: true });
  client.connect(err => {
    assert.equal(null, err);
    const db = client.db(dbName); // declare db
    const collection = db.collection(`${infoCollection}`); // declare collection

    collection
      .find({})
      .project({ dates: 1 })
      .sort({ dates: -1 })
      .limit(1)
      .toArray((err, result) => {
        assert.equal(null, err);
        callback(result); // get result and give it to callback func

        client.close();
      });
  });
};

export default fetchLatestDate;
