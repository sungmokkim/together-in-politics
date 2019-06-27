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
  const { femiWeight, popularityWeight } = community;

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
          $project: {
            name: 1,
            today: '$dates',
            w_count: 1,
            m_count: 1,
            popularity: {
              $multiply: [{ $divide: ['$popularity', popularityWeight] }, 100]
              // divide popularity by respective weight and multiply by 100(percentage)
            },
            femi_ratio: {
              $multiply: [{ $divide: ['$femi_ratio', femiWeight] }, 100]
              // divide femi_ratio by respective weight and multiply by 100(percentage)
            },
            femi_count: 1,
            anti_ratio: {
              $multiply: ['$anti_ratio', 100] // multiply anti_ratio by 100 (percentage)
            },
            anti_count: 1
          }
        },
        {
          $sort: { dates: 1 } //sort by date(from least recent)
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
