const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const ObjectId = require('mongodb').ObjectID;
import env from '../../helpers/serverEnv';
const bcrypt = require('bcryptjs');

const {
  host,
  port,
  user,
  mongopw,
  database,
  freeBoardCollection
} = env.mongodb;

const updateNewComment = (req, callback) => {
  // Connection URL

  const { comment, userName, password, inputId } = req.body;
  const ip = req.headers['x-real-ip'] || req.connection.remoteAddress;

  const url = `mongodb://${user}:${mongopw}@${host}:${port}`;

  // Database Name
  const dbName = `${database}`;

  const client = new MongoClient(url, { useNewUrlParser: true });

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      bcrypt.compare(
        password,
        '$2a$10$LiyTAuP/ICXM9bqvtsy7T.URJ.tlsbKYPCbi7v.Rv2qK7bImmmQxa',
        (err, res) => {
          client.connect(err => {
            assert.equal(null, err);

            const db = client.db(dbName);
            const collection = db.collection(`${freeBoardCollection}`);

            collection.updateOne(
              {
                _id: new ObjectId(inputId)
              },

              {
                $push: {
                  comments: {
                    _id: new ObjectId(),
                    user: userName,
                    password: hash,
                    ip,
                    comment,
                    post_date: new Date(),
                    admin: res ? true : false
                  }
                }
              },
              (err, result) => {
                assert.equal(null, err);

                callback(result);
                client.close();
              }
            );
          });
        }
      );
    });
  });
};

export default updateNewComment;
