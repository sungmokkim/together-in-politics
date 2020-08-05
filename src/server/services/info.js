import dateAndTime from 'date-and-time';
import infoModel from '../models/info';
import wordsToFilter from '../helpers/wordsToFilter';

const getLatestDate = async () => {
  const latestDate = await infoModel.find().select({
    dates: 1,
  }).sort({ dates: 'desc' }).limit(1);

  return latestDate;
};

const getTodayDate = async (query) => {
  const { year, month, date } = query;

  // date to filter
  let todayDate;

  if (year && month && date) {
    todayDate = `${year}-${month}-${date}`;
  } else {
    todayDate = await getLatestDate();
    todayDate = todayDate[0].dates;
  }

  return todayDate;
};

const getRanking = async (query) => {
  const {
    year, month, date, get_latest,
  } = query;

  const todayDate = await getTodayDate(query);

  const ranking = await infoModel.find({ dates: todayDate });

  return ranking;
};

const getTodayIndicator = async (query) => {
  const {
    get_latest,
    community,
  } = query;

  const todayDate = await getTodayDate(query);

  const todayIndicator = await infoModel.aggregate([
    { $match: { name: community, dates: todayDate } },
    {
      $project: {
        name: 1,
        dates: 1,
        w_count: 1,
        m_count: 1,
        popularity: '$popularity',
        femi_ratio: '$femi_ratio',
        anti_popularity: { $divide: ['$anti_count', '$w_count'] },
        problem_ratio: '$problem_ratio',
        femi_count: 1,
        anti_ratio: 1,
        anti_count: 1,

        words: {
          $filter: {
            input: '$words',
            as: 'word',
            cond: {
              $not: {
                $in: ['$$word.word', wordsToFilter],
              },
            },
          },
        },
      },
    },
    {
      $sort: { dates: -1 }, // sort by date(from latest)
    },
  ])
    .limit(1); // get only one since it's daily data

  return todayIndicator;
};

const getDashboardData = async (query) => {
  const {
    community, mentionPortion, range, indicator, latestDate,
  } = query;

  // decontrcut needed values from active community obj
  const {
    femiWeight, popularityWeight, antiWeight, problemWeight,
  } = community;

  const latestDateString = await getTodayDate(latestDate);

  const dateParsed = dateAndTime.parse(latestDateString, 'YYYY-MM-DD', true);

  // define date to fetch from based on given duration
  let subtractedDate;
  switch (range.duration) {
    case 'years':
      subtractedDate = dateAndTime.addYears(dateParsed, 0 - range.number);
      break;
    case 'months':
      subtractedDate = dateAndTime.addMonths(dateParsed, 0 - range.number);
      break;
    case 'days':
      subtractedDate = dateAndTime.addDays(dateParsed, 0 - range.number);
      break;
    case 'total':
      subtractedDate = dateAndTime.parse('2017-05-01', 'YYYY-MM-DD', true);
      break;
    default:
      break;
  }

  // format it to string for mongodb query
  const dateToFetchFrom = dateAndTime.format(
    subtractedDate,
    'YYYY-MM-DD',
    true,
  );

  const dashboardData = await infoModel.aggregate([
    {
      $match: {
        name: community.index,
        dates: { $gte: dateToFetchFrom },
        m_count: {
          $gte: community[mentionPortion.index],
        }, // only fetch records with minimum m_count(freq of mentioning president)
      },
    },
    {
      $group: {
        _id: {
          years: '$years',
          months: '$months',
          name: '$name',
        },
        avg_anti_count: {
          $avg: '$anti_count',
        },
        avg_m_count: {
          $avg: '$m_count',
        },
        avg_problem_count: {
          $avg: '$problem_count',
        },
        sum_m_count: {
          $sum: '$m_count',
        },
        avg_w_count: {
          $avg: '$w_count',
        },
        sum_w_count: {
          $sum: '$w_count',
        },
        avg_femi_count: {
          $avg: '$femi_count',
        },
      },
    },
    {
      $project: {
        name: '$_id.name',
        years: '$_id.years',
        months: '$_id.months',
        anti_ratio: {
          $multiply: [{ $divide: ['$avg_anti_count', '$avg_m_count'] }, 100],
        },
        popularity: {
          $multiply: [
            {
              $divide: [
                { $divide: ['$avg_m_count', '$avg_w_count'] },
                popularityWeight,
              ],
            },
            100,
          ],
        },
        problem_ratio: {
          $multiply: [
            {
              $divide: [
                { $divide: ['$avg_problem_count', '$avg_w_count'] },
                problemWeight,
              ],
            },
            100,
          ],
        },
        anti_popularity: {
          $multiply: [
            {
              $divide: [
                { $divide: ['$avg_anti_count', '$avg_w_count'] },
                antiWeight,
              ],
            },
            100,
          ],
        },
        femi_ratio: {
          $multiply: [
            {
              $divide: [
                { $divide: ['$avg_femi_count', '$avg_w_count'] },
                femiWeight,
              ],
            },
            100,
          ],
        },
        femi_count: '$avg_femi_count',
        anti_count: '$avg_anti_count',
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  return dashboardData;
};

const getMaxValues = async (query) => {
  const { active, communities } = query;

  // map query conditions
  // each community has its own 'mentionPortion' value
  // to make it in query, it has to be mapped in an array
  const mapConditions = Object.keys(communities).map((comm) => ({
    name: comm,
    m_count: {
      // get the current mentionPortion value based on given community name in community object
      $gte: communities[comm][active.mentionPortion.index],
    },
  }));

  const maxValues = await infoModel.aggregate([
    {
      $match: {
        $or: mapConditions,
      },
    },
    {
      $group: {
        _id: '$name',
        anti_ratio: { $max: '$anti_ratio' },
        popularity: { $max: '$popularity' },
        femi_ratio: { $max: '$femi_ratio' },
        problem_ratio: { $max: '$problem_ratio' },
      },
    },
    {
      $project: {
        name: '$_id',
        anti_ratio: '$anti_ratio',
        popularity: '$popularity',
        femi_ratio: '$femi_ratio',
        problem_ratio: '$problem_ratio',
      },
    },
    {
      $addFields: {
        mentionPortion: active.mentionPortion.index,
      },
    },
  ]);

  return maxValues;
};

const getBubbleChartData = async (query) => {
  // decontrcut type (whether it's monthly or yearly) and type from period date given
  const { type, value } = query;

  const latestDateString = await getTodayDate({});

  const dateParsed = dateAndTime.parse(latestDateString, 'YYYY-MM-DD', true);

  // define date to fetch from based on given duration
  let subtractedDate;
  switch (type) {
    case 'year':
      subtractedDate = dateAndTime.addYears(dateParsed, 0 - value);
      break;
    case 'month':
      subtractedDate = dateAndTime.addMonths(dateParsed, 0 - value);
      break;
    default:
      break;
  }

  // parse it to string (for query)
  // if something goes wrong, it would be the default date('2017-05-01)
  const dateToFetchFrom = subtractedDate
    ? dateAndTime.format(subtractedDate, 'YYYY-MM-DD', true)
    : '2017-05-01';

  const bubbleChartData = await infoModel.aggregate([
    {
      $match: { dates: { $gte: dateToFetchFrom }, m_count: { $gte: 100 } },
    },
    {
      $group: {
        _id: '$name',
        anti_count_sum: { $sum: '$anti_count' },
        m_count_sum: { $sum: '$m_count' },
        w_count_avg: { $avg: '$w_count' },
        w_count_sum: { $sum: '$w_count' },
        femi_count_sum: { $sum: '$femi_count' },
      },
    },
    {
      $project: {
        name: '$_id',
        anti_ratio: {
          $divide: ['$anti_count_sum', '$m_count_sum'],
        },
        w_count: '$w_count_avg',
        femi_ratio: {
          $divide: ['$femi_count_sum', '$w_count_sum'],
        },
        popularity: {
          $divide: ['$m_count_sum', '$w_count_sum'],
        },
      },
    },
  ]);

  return bubbleChartData;
};

const getKeywordData = async (query) => {
  const {
    community, latestDate, period, mentionPortion, rankingSorting,
  } = query;

  // decontruct object to get type and value, also get limit(number) to control document numbers
  const { type, value, limit } = period;
  const todayString = await getTodayDate(latestDate);
  const today = dateAndTime.parse(todayString, 'YYYY-MM-DD', true);

  // get actual date from the latest date
  let dateFrom;
  switch (type) {
    // subtracting respective period(months, years, days) from the latest date
    case 'year':
      dateFrom = dateAndTime.addYears(today, 0 - value);
      break;
    case 'month':
      dateFrom = dateAndTime.addMonths(today, 0 - value);
      break;
    case 'day':
      dateFrom = dateAndTime.addDays(today, 0 - value);
      break;
    default:
      break;
  }

  // convert date object to string (for db query) if something goes wrong, the date string would be '2017-05-01' (oldest date from our data)
  const dateString = dateFrom
    ? dateAndTime.format(dateFrom, 'YYYY-MM-DD', true)
    : '2017-05-01';

  // deconstruct necessary weights from community object
  const { popularityWeight, femiWeight, problemWeight } = community;

  const keywordData = await infoModel.aggregate([
    {
      $match: {
        name: community.index,
        dates: { $gte: dateString },
        m_count: { $gte: community[mentionPortion.index] }, // only fetch records with minimum m_count(freq of mentioning president)
      },
    },
    {
      $project: {
        name: 1,
        dates: 1,
        w_count: 1,
        m_count: 1,
        popularity: {
          $divide: ['$popularity', popularityWeight], // divide popularity by corresponding weight
        },
        femi_ratio: {
          $divide: ['$femi_ratio', femiWeight], // divide femi_ratio by corresponding weight
        },
        problem_ratio: {
          $divide: [
            { $divide: ['$problem_count', '$w_count'] }, // divide problem_ratio by corresponding weight
            problemWeight,
          ],
        },
        anti_ratio: 1,
        anti_count: 1,
        words: {
          $filter: {
            input: '$words',
            as: 'word',
            cond: {
              $not: {
                $in: ['$$word.word', wordsToFilter], // filter words from imported word list
              },
            },
          },
        },
      },
    },
  ]);

  return keywordData;
};

export default {
  getLatestDate,
  getRanking,
  getTodayIndicator,
  getMaxValues,
  getDashboardData,
  getBubbleChartData,
  getKeywordData,
};
