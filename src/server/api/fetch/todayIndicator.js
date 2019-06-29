const mysql = require('mysql');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
import env from '../../helpers/serverEnv';
import wordsToFilter from '../../helpers/wordsToFilter';

const {
  host,
  port,
  user,
  mongopw,
  database,
  infoCollection
} = env.mongodb_info;

const fetchTodayIndicator = (
  {
    year,
    month,
    date,
    get_latest,
    community,
    popularityWeight,
    femiWeight,
    antiWeight
  },
  callback
) => {
  const url = `mongodb://${user}:${mongopw}@${host}:${port}`;

  // Database Name
  const dbName = `${database}`;

  let todayDate = `${year}-${month}-${date}`;

  if (community) {
    if (get_latest) {
      // if no specific date is defined, get the most recent data
      const client = new MongoClient(url, { useNewUrlParser: true });
      client.connect(err => {
        assert.equal(null, err);
        const db = client.db(dbName);
        const collection = db.collection(`${infoCollection}`);
        collection
          .aggregate([
            { $match: { name: community } },

            {
              $project: {
                name: 1,
                dates: 1,
                w_count: 1,
                m_count: 1,
                popularity: {
                  $divide: ['$popularity', popularityWeight] // divide popularity by corresponding weight
                },
                femi_ratio: {
                  $divide: ['$femi_ratio', femiWeight] // divide femi_ratio by corresponding weight
                },
                anti_popularity: {
                  $divide: [
                    { $divide: ['$anti_count', '$w_count'] },
                    antiWeight
                  ] // divide anti_popularity by corresponding weight
                },
                femi_count: 1,
                anti_ratio: 1,
                anti_count: 1,

                words: {
                  $filter: {
                    input: '$words',
                    as: 'word',
                    cond: {
                      $not: {
                        $in: ['$$word.word', wordsToFilter]
                      }
                    }
                  }
                }
              }
            },
            {
              $sort: { dates: -1 } //sort by date(from latest)
            }
          ])
          .limit(1) // get only one since it's daily data
          .toArray((err, result) => {
            assert.equal(null, err);
            callback(result); // get result and give it to callback func

            client.close();
          });
      });
    } else {
      const client = new MongoClient(url, { useNewUrlParser: true });
      client.connect(err => {
        assert.equal(null, err);
        const db = client.db(dbName);
        const collection = db.collection(`${infoCollection}`);
        collection
          .aggregate([
            { $match: { name: community, dates: todayDate } },

            {
              $project: {
                name: 1,
                dates: 1,
                w_count: 1,
                m_count: 1,
                popularity: {
                  $divide: ['$popularity', popularityWeight] // divide popularity by corresponding weight
                },
                femi_ratio: {
                  $divide: ['$femi_ratio', femiWeight] // divide popularity by corresponding weight
                },
                anti_popularity: {
                  $divide: [
                    { $divide: ['$anti_count', '$w_count'] },
                    antiWeight
                  ] // divide anti_popularity by corresponding weight
                },
                femi_count: 1,
                anti_ratio: 1,
                anti_count: 1,
                words: {
                  $filter: {
                    input: '$words',
                    as: 'word',
                    cond: {
                      $not: {
                        $in: ['$$word.word', wordsToFilter]
                      }
                    }
                  }
                }
              }
            },
            {
              $sort: { dates: -1 } //sort by date(from latest)
            }
          ])
          .limit(1) // get only one since it's daily data
          .toArray((err, result) => {
            assert.equal(null, err);
            callback(result); // get result and give it to callback func

            client.close();
          });
      });
    }
  }
};

export default fetchTodayIndicator;
