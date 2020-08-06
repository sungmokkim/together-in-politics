import infoService from '../services/info';

const getLatestDate = async () => {
  const latestDate = await infoService.getLatestDate();

  return latestDate;
};

const getRanking = async (query) => {
  const ranking = await infoService.getRanking(query);
  return ranking;
};

const getTodayIndicator = async (query) => {
  const todayIndicator = await infoService.getTodayIndicator(query);

  return todayIndicator;
};

const getMaxValues = async (body) => {
  console.log('max VALUE reached');
  const maxValues = await infoService.getMaxValues(body);
  console.log('max value is', maxValues);
  return maxValues;
};

const getDashboardData = async (body) => {
  const dashboardData = await infoService.getDashboardData(body);

  return dashboardData;
};

const getBubbleChartData = async (body) => {
  const bubbleChartData = await infoService.getBubbleChartData(body);

  return bubbleChartData;
};

const getKeywordData = async (body) => {
  const bubbleChartData = await infoService.getKeywordData(body);

  return bubbleChartData;
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
