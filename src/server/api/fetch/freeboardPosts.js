const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
import env from '../../helpers/serverEnv';
import dateAndTime from 'date-and-time';

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
  // const newTime = dateAndTime.addHours(new Date(), -2);
  client.connect(err => {
    assert.equal(null, err);

    const db = client.db(dbName);
    const collection = db.collection(`${freeBoardCollection}`);
    collection
      .aggregate([
        // {
        //   $match: { post_date: { $gt: newTime } }
        // },
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
                timezone: 'Asia/Seoul'
              }
            },
            admin: 1,
            comments: { $size: '$comments' }
          }
        }
      ])
      .sort({ _id: -1 })

      .toArray((err, result) => {
        assert.equal(null, err);
        callback(result);
      });
  });
};

export default fetchFreeboardPosts;
