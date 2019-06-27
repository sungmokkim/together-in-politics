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
    const { year, month, date } = this.props.latestDate;
    this.state = {
      selectedDay: this.props.latestDate
        ? dateAndTime.parse(`${year}-${month}-${date}`, 'YYYY-MM-DD', true)
        : null,
      btnOpacity: 0,
      toggled: false,
      clientX: 0,
      clientY: 0
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
      btnOpacity: 1
    });
  }
  handleDayClick = (inputDate, modifiers = {}) => {
    if (modifiers.disabled) {
      return; // if user clicks disabled date(no data for us)
    }
    this.setState({
      ...this.state,
      selectedDay: modifiers.selected ? undefined : inputDate,
      toggled: false
    });

    this.props.handleDateChangeFromCalendar({
      year: dateAndTime.format(inputDate, 'YYYY', true),
      month: dateAndTime.format(inputDate, 'MM', true),
      date: dateAndTime.format(inputDate, 'DD', true)
    });
  };

  handleButtonClick = e => {
    this.setState({
      ...this.state,
      toggled: !this.state.toggled,
      clientX: e.clientX,
      clientY: e.clientY
    });

    document.body.style.overflow = 'hidden'; // hide scroll when calendar displays
  };

  render() {
    const { year, month, date } = this.props.latestDate;
    const { currentDate } = this.props;
    let latestDateParsed = undefined;
    let monthFormat;
    let initialMonth;
    if (this.props.latestDate && this.state.selectedDay) {
      latestDateParsed = dateAndTime.parse(
        `${year}-${month}-${date}`,
        'YYYY-MM-DD',
        true
      );
      monthFormat = dateAndTime.format(this.state.selectedDay, 'YYYY-MM');

      initialMonth = dateAndTime.parse(monthFormat, 'YYYY-MM', true);
    }

    const disabledDays = {
      before: new Date(2017, 4, 1),
      after: latestDateParsed
    };

    const modifiersStyles = {
      birthday: {
        color: 'white',
        backgroundColor: '#ffc107'
      },
      thursdays: {
        color: '#ffc107',
        backgroundColor: '#fffdee'
      }
    };

    return (
      <React.Fragment>
        <span className='indicator-btn-wrapper'>
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
                {`${currentDate.year}.${currentDate.month}.${currentDate.date}`}
              </span>
            </span>
          </span>
        </span>
        <div
          className='calendar-wrapper'
          style={{ display: this.state.toggled ? 'block' : 'none' }}
          onClick={e => {
            if (e.target.className === 'calendar-wrapper') {
              this.setState({
                ...this.state,
                toggled: false
              });
              document.body.style.overflow = 'scroll';
            }
          }}
        >
          <span
            className='calendar selection-fade-in'
            style={{
              display: this.state.toggled ? 'block' : 'none',
              opacity: this.state.toggled ? 1 : 0,
              position: 'fixed',
              zIndex: '10',
              left: this.state.clientX - 120,
              top: this.state.clientY + 15
            }}
          >
            <DayPicker
              onDayClick={this.handleDayClick}
              selectedDays={
                this.state.selectedDay
                  ? this.state.selectedDay
                  : new Date(2019, 1, 1)
              }
              disabledDays={disabledDays}
              month={initialMonth}
              modifiersStyles={modifiersStyles}
              months={MONTHS}
              weekdaysLong={WEEKDAYS_LONG}
              weekdaysShort={WEEKDAYS_SHORT}
            />
          </span>
        </div>
      </React.Fragment>
    );
  }
}

export default CalendarModule;
