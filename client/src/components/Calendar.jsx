import React from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-dates/lib/css/_datepicker.css';
import { Dates, CustomInput, CalendarMain, Main } from './Calendar.css';
//import 'react-datepicker/dist/react-datepicker-cssmodules.css';
class Calendar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      startDate: moment(),
      unavailbleDates: [],
      excludeDates: [moment().add(1, "days"), moment().add(3, "days"), moment('2018/3/20')],
      main: 'Main'
    };
    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
    this.checkChangeEnd = this.checkChangeEnd.bind(this);
    this.populateUnavailableDates = this.populateUnavailableDates.bind(this);
    this.checkChangeStart = this.checkChangeStart.bind(this);
    this.toggleRender = this.toggleRender.bind(this);
  }
  componentDidMount () {
    this.populateUnavailableDates();
    console.log('here', this.props.ud);
    console.log(moment().add(1, "days"));
  }
  populateUnavailableDates() {
    this.setState({excludeDates: this.props.ud})
    console.log('right here', this.props.ud);
  }
  handleChangeStart(date) {
    this.setState({
      startDate: date
    });
    setTimeout(this.checkChangeStart(date), 1000);
  }
  checkChangeStart (date) {
    if(this.state.endDate){
      var endDate = this.state.endDate;
      console.log('there is an end date!');
      for(var i = 0; i < this.state.excludeDates.length; i++){
        if(this.state.excludeDates[i] > date && this.state.excludeDates[i] < endDate){
          this.props.handleInvalidDates(true);
          return;
        }
      }
      if(date > endDate){
        this.props.handleInvalidDates(true);
        return;
      }
      if(date === endDate){
        this.props.handleInvalidDates(true);
        return;
      }
      this.props.handleInvalidDates();

    } else {
      console.log('end date not selected');
    }
  }
  checkChangeEnd (date) {
    var fromDate = this.state.startDate;
    var newDate = fromDate;
     var toDate = this.state.endDate;
     var count = 0;
     var validDate = true
      for(var i = 0; i < this.state.excludeDates.length; i++){
        if(this.state.excludeDates[i] > fromDate && this.state.excludeDates[i] < date){
          this.props.handleInvalidDates(validDate);
          return;
        }
      }
      if(fromDate > date){
        this.props.handleInvalidDates(validDate);
        return;
      }
      if(fromDate === date){
        this.props.handleInvalidDates(validDate);
        return;
      }
      this.props.handleInvalidDates();
  }

  handleChangeEnd(date) {
    this.setState({
      endDate: date
    });
    setTimeout(this.checkChangeEnd(date), 1000);
  }
  toggleRender () {
    if(this.state.main === 'main'){
      this.setState(function () {
        return {
          main : 'back'
        }
      })
    } else {
      this.setState(function () {
        return {
          main : 'main'
        }
      })
    }
  }
  render() {
    return (
      <button className={Main} onClick={this.toggleRender}>
        <div className={Dates}> Dates </div>
        <div className={CalendarMain}>
          <DatePicker
            input className={CustomInput}
            selected={this.state.startDate}
            selectsStart
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onChange={this.handleChangeStart}
            excludeDates={this.state.excludeDates}
            minDate={moment()}
            maxDate={moment().add(3, "months")}
          />
          <DatePicker
            input className={CustomInput}
            selected={this.state.endDate}
            selectsEnd
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onChange={this.handleChangeEnd}
            minDate={moment().add(1, "days")}
            excludeDates={this.state.excludeDates}
            maxDate={moment().add(3, "months")}
          />
        </div>
      </button>
  )}
}

export default Calendar;