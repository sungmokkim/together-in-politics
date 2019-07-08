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

const fetchMaxValues = callback => {
  const url = `mongodb://${user}:${mongopw}@${host}:${port}`;

  // Database Name
  const dbName = `${database}`;

  const client = new MongoClient(url, { useNewUrlParser: true });
  client.connect(err => {
    assert.equal(null, err);
    const db = client.db(dbName); // declare db
    const collection = db.collection(`${infoCollection}`); // declare collection

    collection
      .aggregate([
        {
          $group: {
            _id: '$name',
            anti_ratio: { $max: '$anti_ratio' },
            popularity: { $max: '$popularity' },
            femi_ratio: { $max: '$femi_ratio' },
            problem_ratio: { $max: '$problem_ratio' }
          }
        },
        {
          $project: {
            name: '$_id',
            anti_ratio: '$anti_ratio',
            popularity: '$popularity',
            femi_ratio: '$femi_ratio',
            problem_ratio: '$problem_ratio'
          }
        }
      ])
      .toArray((err, result) => {
        assert.equal(null, err);
        callback(result); // get result and give it to callback func
        client.close();
      });
  });
};

export default fetchMaxValues;
