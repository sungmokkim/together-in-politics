import React, { Component } from 'react';
import DayPicker from 'react-day-picker';
import dateAndTime from 'date-and-time';

const MONTHS = [
  '1월',
  '2월',
  '3월',
  '4월',
  '5월',
  '6월',
  '7월',
  '8월',
  '9월',
  '10월',
  '11월',
  '12월'
];
const WEEKDAYS_LONG = [
  '일요일',
  '월요일',
  '화요일',
  '수요일',
  '목요일',
  '금요일',
  '토요일'
];
const WEEKDAYS_SHORT = ['일', '월', '화', '수', '목', '금', '토'];

class CalendarModule extends Component {
  constructor(props) {
    super(props);
    const { year, month, date } = this.props.currentDate;
    this.state = {
      selectedDay: this.props.currentDate
        ? dateAndTime.parse(`${year}-${month}-${date}`, 'YYYY-MM-DD', true)
        : null,
      btnOpacity: 0,
      toggled: false,
      clientX: 0,
      clientY: 0,
      modalDisplay: 'none'
    };
  }
  componentDidMount() {
    const { year, month, date } = this.props.currentDate;

    this.setState({
      ...this.state,
      selectedDay: dateAndTime.parse(
        `${year}-${month}-${date}`,
        'YYYY-MM-DD',
        true
      ),
      btnOpacity: 1,
      modalDisplay: 'none'
    });
  }
  handleDayClick = (inputDate, modifiers = {}) => {
    if (modifiers.disabled) {
      return; // if user clicks disabled date(no data for us)
    }

    // this.setState({
    //   ...this.state,
    //   selectedDay: inputDate
    // });

    this.props.handleDateChangeFromCalendar({
      year: dateAndTime.format(inputDate, 'YYYY', true),
      month: dateAndTime.format(inputDate, 'MM', true),
      date: dateAndTime.format(inputDate, 'DD', true)
    });

    this.controlModalFadeOut();
  };

  handleButtonClick = e => {
    this.setState(
      {
        ...this.state,
        toggled: !this.state.toggled,
        clientX: e.clientX,
        clientY: e.clientY
      },
      () => {
        if (this.state.toggled) {
          // document.body.style.overflow = 'hidden'; // hide scroll when calendar displays

          this.setState({
            ...this.state,
            modalDisplay: 'block'
          });
        } else {
          this.controlModalFadeOut();
        }
      }
    );
  };

  controlModalFadeOut = () => {
    this.setState(
      {
        ...this.state,
        modalDisplay: 'block',
        toggled: false
      },
      async () => {
        await setTimeout(() => {
          this.setState({
            ...this.state,
            modalDisplay: 'none',
            toggled: false
          });
        }, 300);

        // document.body.style.overflow = 'auto';
      }
    );
  };

  getDatesForCalendar = () => {
    // get current Date
    const { currentDate } = this.props;

    // format current Date
    const currentDateFormat = `${currentDate.year}-${currentDate.month}-${
      currentDate.date
    }`;

    // parse currentDate to be used in calendar module
    const currentDateParsed = dateAndTime.parse(
      currentDateFormat,
      'YYYY-MM-DD',
      true
    );

    // parse latest date to be used in calendar module
    // this sets a boundary for selectable and unselectable dates
    let latestDateParsed;
    let monthFormat;
    let initialMonth;
    if (this.props.latestDate) {
      // decontruct latestDate
      const { year, month, date } = this.props.latestDate;

      latestDateParsed = dateAndTime.parse(
        `${year}-${month}-${date}`,
        'YYYY-MM-DD',
        true
      );
      monthFormat = dateAndTime.format(currentDateParsed, 'YYYY-MM');

      initialMonth = dateAndTime.parse(monthFormat, 'YYYY-MM', true);
    } else {
      latestDateParsed = dateAndTime.parse(`2019-01-01`, 'YYYY-MM-DD', true);
      monthFormat = dateAndTime.format(currentDateParsed, 'YYYY-MM');
      initialMonth = dateAndTime.parse(monthFormat, 'YYYY-MM', true);
    }

    return {
      latestDateParsed,
      initialMonth,
      currentDateParsed,
      currentDateFormat
    };
  };
  render() {
    const {
      latestDateParsed,
      initialMonth,
      currentDateParsed,
      currentDateFormat
    } = this.getDatesForCalendar();

    const disabledDays = {
      before: new Date(2017, 4, 1),
      after: latestDateParsed
    };

    return (
      <React.Fragment>
        {/*  calendar button */}
        <span
          className={`indicator-btn-wrapper ${
            this.props.btnClicked ? 'selection-fade-in' : 'selection-fade-out'
          }`}
        >
          <span
            className='indicator-btn'
            style={{
              opacity: this.state.btnOpacity
            }}
            onClick={this.handleButtonClick}
          >
            <span className='initial-display-wrapper'>
              <i className='far fa-calendar-check indicator-mark' />
              <span
                className='active-element'
                style={{ display: this.state.toggled ? 'none' : 'inline' }}
              >
                {/* displays current date */}
                {currentDateParsed.toLocaleString('ko-KR', {
                  timeZone: 'UTC',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </span>
          </span>
        </span>

        {/* calendar overlay */}
        <div
          className={`calendar-wrapper ${
            this.state.toggled ? 'opacity-fade-in' : 'opacity-fade-out'
          }`}
          style={{ display: this.state.modalDisplay }}
          onClick={this.controlModalFadeOut}
        />

        {/* calendar module */}
        <span
          className={`calendar ${
            this.state.toggled ? 'selection-fade-in' : 'selection-fade-out'
          }`}
          style={{
            display: this.state.modalDisplay,
            opacity: this.state.toggled ? 1 : 0,
            position: 'fixed',
            zIndex: '10',
            left: this.state.clientX,
            top: this.state.clientY - 200
          }}
        >
          <DayPicker
            onDayClick={this.handleDayClick}
            selectedDays={currentDateParsed}
            disabledDays={disabledDays}
            month={initialMonth}
            months={MONTHS}
            weekdaysLong={WEEKDAYS_LONG}
            weekdaysShort={WEEKDAYS_SHORT}
          />
        </span>
      </React.Fragment>
    );
  }
}

export default CalendarModule;
