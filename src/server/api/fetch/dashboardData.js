import env from '../../helpers/serverEnv';
import dateAndTime from 'date-and-time';
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const {
  host,
  port,
  user,
  mongopw,
  database,
  infoCollection
} = env.mongodb_info;

const fetchDashboardData = (
  { community, mentionPortion, range, indicator, latestDate },
  callback
) => {
  const url = `mongodb://${user}:${mongopw}@${host}:${port}`;

  // Database Name
  const dbName = `${database}`;

  // decontruct year, month, date from the most recent date
  const { year, month, date } = latestDate;

  // decontrcut needed values from active community obj
  const { femiWeight, popularityWeight, antiWeight } = community;

  const latestDateString = `${year}-${month}-${date}`;

  const dateParsed = dateAndTime.parse(latestDateString, 'YYYY-MM-DD', true);

  // define date to fetch from based on given duration
  let subtractedDate;
  switch (range['duration']) {
    case 'years':
      subtractedDate = dateAndTime.addYears(dateParsed, 0 - range['number']);
      break;
    case 'months':
      subtractedDate = dateAndTime.addMonths(dateParsed, 0 - range['number']);
      break;
    case 'days':
      subtractedDate = dateAndTime.addDays(dateParsed, 0 - range['number']);
    case 'total':
      subtractedDate = dateAndTime.parse('2017-05-01', 'YYYY-MM-DD', true);
    default:
      break;
  }

  // format it to string for mongodb query
  const dateToFetchFrom = dateAndTime.format(
    subtractedDate,
    'YYYY-MM-DD',
    true
  );

  const client = new MongoClient(url, { useNewUrlParser: true });
  client.connect(err => {
    assert.equal(null, err);
    const db = client.db(dbName);
    const collection = db.collection(`${infoCollection}`);
    collection
      .aggregate([
        {
          $match: {
            name: community.index,
            dates: { $gte: dateToFetchFrom },
            m_count: {
              $gte:
                indicator === 'popularity' ? 0 : community[mentionPortion.index]
            } // only fetch records with minimum m_count(freq of mentioning president) when the indicator is not popularity
          }
        },
        {
          $group: {
            _id: {
              years: '$years',
              months: '$months',
              name: '$name'
            },
            avg_anti_count: {
              $avg: '$anti_count'
            },
            avg_m_count: {
              $avg: '$m_count'
            },
            sum_m_count: {
              $sum: '$m_count'
            },
            avg_w_count: {
              $avg: '$w_count'
            },
            sum_w_count: {
              $sum: '$w_count'
            },
            avg_femi_count: {
              $avg: '$femi_count'
            }
          }
        },
        {
          $project: {
            name: '$_id.name',
            years: '$_id.years',
            months: '$_id.months',
            anti_ratio: {
              $multiply: [{ $divide: ['$avg_anti_count', '$avg_m_count'] }, 100]
            },
            popularity: {
              $multiply: [
                {
                  $divide: [
                    { $divide: ['$avg_m_count', '$avg_w_count'] },
                    popularityWeight
                  ]
                },
                100
              ]
            },
            anti_popularity: {
              $multiply: [
                {
                  $divide: [
                    { $divide: ['$avg_anti_count', '$avg_w_count'] },
                    antiWeight
                  ]
                },
                100
              ]
            },
            femi_ratio: {
              $multiply: [
                {
                  $divide: [
                    { $divide: ['$avg_femi_count', '$avg_w_count'] },
                    femiWeight
                  ]
                },
                100
              ]
            },
            femi_count: '$avg_femi_count',
            anti_count: '$avg_anti_count'
          }
        },
        {
          $sort: { _id: 1 }
        }
      ])
      .toArray((err, result) => {
        assert.equal(null, err);
        callback(result); // get result and give it to callback func

        client.close();
      });
  });
};

export default fetchDashboardData;
