const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
import env from '../../helpers/serverEnv';
const ObjectId = require('mongodb').ObjectID;

const {
  host,
  port,
  user,
  mongopw,
  database,
  freeBoardCollection
} = env.mongodb;

const fetchComments = ({ postId }, callback) => {
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
      .aggregate([
        {
          $match: { _id: ObjectId(postId) }
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
                      timezone: 'Asia/Seoul'
                    }
                  },
                  admin: '$$this.admin'
                }
              }
            }
          }
        }
      ])

      .sort({ _id: -1 })

      .toArray((err, result) => {
        assert.equal(null, err);
        callback(result);
        client.close();
      });
  });
};

export default fetchComments;
