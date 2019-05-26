import React from 'react';
import dateAndTime from 'date-and-time';

const todayUTC = new Date(Date.now());
const todayKorean = dateAndTime.addHours(todayUTC, 9);
const currentYear = dateAndTime.format(todayKorean, 'YYYY', true);
const currentMonth = dateAndTime.format(todayKorean, 'MM', true);
const currentDate = dateAndTime.format(todayKorean, 'DD', true);

export const getAndMap = (
  { latestYear, latestMonth, latestDate },
  { currentYear, currentMonth, currentDate },
  type
) => {
  if (!latestYear) {
    return <option value='null'>Loading</option>;
  }

  // configure year --------------
  const latestYearNumber = parseInt(latestYear);

  const yearToMap = [...Array(latestYearNumber + 1).keys()].slice(
    2017,
    latestYearNumber + 1
  );
  //------------------------------------------

  // configure months -----------------------
  const months = [...Array(13).keys()];
  const currentMonthNumber = parseInt(currentMonth);
  let monthsToMap;
  const latestMonthNumber = parseInt(latestMonth);

  //-------------------------------------------

  // date configure
  let fullDate = new Date(
    Date.UTC(parseInt(currentYear), parseInt(currentMonth), 0)
  );

  const currentDateNumber = parseInt(currentDate);

  let dateOnly = parseInt(dateAndTime.format(fullDate, 'DD', true));
  const dateArray = [...Array(dateOnly + 1).keys()];
  let dateToMap;
  if (currentYear === latestYear && currentMonth === latestMonth) {
    dateToMap = dateArray.slice(1, parseInt(latestDate) + 1);
  } else {
    dateToMap = dateArray.slice(1, dateOnly + 1);
  }
  //------------------------------------------

  switch (type) {
    case 'year':
      return yearToMap.map(year => {
        const yearString = year.toString();
        return (
          <option key={yearString} value={yearString}>
            {yearString}
          </option>
        );
      });

    case 'month':
      switch (currentYear) {
        case '2017':
          monthsToMap = months.slice(5, 13);
          break;
        case latestYear:
          monthsToMap = months.slice(1, latestMonthNumber + 1);
          break;
        default:
          monthsToMap = months.slice(1, 13);
          break;
      }
      return monthsToMap.map(month => {
        const monthString =
          month.toString().length > 1
            ? month.toString()
            : '0' + month.toString();
        return (
          <option key={monthString} value={monthString}>
            {monthString}
          </option>
        );
      });
    case 'date':
      return dateToMap.map(date => {
        const dateString =
          date.toString().length > 1 ? date.toString() : '0' + date.toString();
        return (
          <option key={dateString} value={dateString}>
            {dateString}
          </option>
        );
      });

    case 'valid':
      let validMonthArray;

      switch (currentYear) {
        case '2017':
          validMonthArray = months.slice(5, 13);
          break;
        case latestYear:
          validMonthArray = months.slice(1, latestMonthNumber + 1);
          break;
        default:
          validMonthArray = months.slice(1, 13);
          break;
      }
      const validMonthNumber =
        validMonthArray.indexOf(currentMonthNumber) > -1
          ? currentMonthNumber
          : validMonthArray[validMonthArray.length - 1];

      const validMonthString =
        validMonthNumber.toString().length > 1
          ? validMonthNumber.toString()
          : '0' + validMonthNumber.toString();

      let validDateArray;

      if (currentYear === latestYear && currentMonth === latestMonth) {
        validDateArray = dateArray.slice(1, parseInt(latestDate) + 1);
      } else {
        validDateArray = dateArray.slice(1, dateOnly + 1);
      }

      const validDateNumber =
        validDateArray.indexOf(currentDateNumber) > -1
          ? currentDateNumber
          : validDateArray[validDateArray.length - 1];
      console.log(validDateNumber);
      const validDateString =
        validDateNumber.toString().length > 1
          ? validDateNumber.toString()
          : '0' + validDateNumber.toString();

      const validValue = {
        year: currentYear,
        month: validMonthString,
        date: validDateString
      };

      return Promise.resolve(validValue);

    default:
      return <option value='null'>Loading</option>;
  }
};

export const getAndMapYears = latestYear => {
  const currentYearNumber = parseInt(latestYear);

  return [...Array(currentYearNumber + 1).keys()]
    .slice(2017, currentYearNumber + 1)
    .map(year => {
      const yearString = year.toString();
      return (
        <option key={yearString} value={yearString}>
          {yearString}
        </option>
      );
    });
};

export const getAndMapMonths = yearInput => {
  const months = [...Array(13).keys()];
  let mapMonths;
  const currentMonthNumber = parseInt(currentMonth);
  switch (yearInput) {
    case '2017':
      mapMonths = months.slice(5, 13);
      break;
    case currentYear:
      mapMonths = months.slice(1, currentMonthNumber + 1);
      break;
    default:
      mapMonths = months.slice(1, 13);
      break;
  }

  return mapMonths.map(month => {
    const monthString =
      month.toString().length > 1 ? month.toString() : '0' + month.toString();
    return (
      <option key={monthString} value={monthString}>
        {monthString}
      </option>
    );
  });
};

export const getValidDateFromInput = (
  yearInput,
  monthInput,
  dateInput,
  callback
) => {
  const months = [...Array(13).keys()];
  const monthInputNumber = parseInt(monthInput);
  const currentMonthNumber = parseInt(currentMonth);
  const dateInputNumber = parseInt(dateInput);

  let validMonthArray;

  switch (yearInput) {
    case '2017':
      validMonthArray = months.slice(5, 13);
      break;
    case currentYear:
      validMonthArray = months.slice(1, currentMonthNumber + 1);
      break;
    default:
      validMonthArray = months.slice(1, 13);
      break;
  }
  const validMonthNumber =
    validMonthArray.indexOf(monthInputNumber) > -1
      ? monthInputNumber
      : validMonthArray[validMonthArray.length - 1];

  const validMonthString =
    validMonthNumber.toString().length > 1
      ? validMonthNumber.toString()
      : '0' + validMonthNumber.toString();

  let fullDate = new Date(
    Date.UTC(parseInt(yearInput), parseInt(validMonthNumber), 0)
  );

  let dateOnly = parseInt(dateAndTime.format(fullDate, 'DD', true));
  const dateArray = [...Array(dateOnly + 1).keys()];

  let validDateArray;
  if (yearInput === currentYear && validMonthString === currentMonth) {
    validDateArray = dateArray.slice(1, parseInt(currentDate));
  } else {
    validDateArray = dateArray.slice(1, dateOnly + 1);
  }

  const validDateNumber =
    validDateArray.indexOf(dateInputNumber) > -1
      ? dateInputNumber
      : validDateArray[validDateArray.length - 1];

  const validDateString =
    validDateNumber.toString().length > 1
      ? validDateNumber.toString()
      : '0' + validDateNumber.toString();

  callback(yearInput, validMonthString, validDateString);
};

export const getAndMapDates = (yearInput, monthInput) => {
  console.log(yearInput, monthInput);
  let fullDate = new Date(
    Date.UTC(parseInt(yearInput), parseInt(monthInput), 0)
  );

  let dateOnly = parseInt(dateAndTime.format(fullDate, 'DD', true));
  const dateArray = [...Array(dateOnly + 1).keys()];

  let mapDate;
  if (yearInput === currentYear && monthInput === currentMonth) {
    mapDate = dateArray.slice(1, parseInt(currentDate));
  } else {
    mapDate = dateArray.slice(1, dateOnly + 1);
  }

  return mapDate.map(date => {
    const dateString =
      date.toString().length > 1 ? date.toString() : '0' + date.toString();
    return (
      <option key={dateString} value={dateString}>
        {dateString}
      </option>
    );
  });
};
