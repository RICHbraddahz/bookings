import moment from 'moment';
import React from 'react';
import $ from 'jquery';
import Calendar from './Calendar';
import Ratings from './Ratings';
import Guests from './Guests';

import { BookingsMain, Price, Amount, Night, Book, Fake, Line, BookingOptions } from './Bookings.css';

class Bookings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        id: 1, unavailable_dates: ['3/27/2018'], rating: 4, rating_amount: 81, guest_max: 4, cost: 187, min_stay: 3, max_stay: 25, children_allowed: true
      },
      invalidDate: false,
      readyToBook: false,
      booked: 'Book',
      renderBook: true,
      unavailableDates: [moment('2018/3/20')],
    };
    this.handleInvalidDates = this.handleInvalidDates.bind(this);
    this.handleBook = this.handleBook.bind(this);
    this.fetchBooking = this.fetchBooking.bind(this);
    this.handleGuest = this.handleGuest.bind(this);
    this.toggleBook = this.toggleBook.bind(this);
    this.addInvalidDates = this.addInvalidDates.bind(this);
  }
  // componentWillMount() {
  //   let id = this.props.id;
  //   this.fetchBooking(id);
  // }
  componentDidMount() {
    let id = this.props.id;
    this.fetchBooking(id);
  }
  toggleBook() {
    if (this.state.renderBook === true) {
      this.setState(() => {
        return {
          renderBook: false,
        };
      });
    } else {
      this.setState(() => {
        return {
          renderBook: true,
        };
      });
    }
  }
  fetchBooking(listing) {
    const that = this;
    $.ajax({
      type: 'GET',
      url: `/api/bookings/${listing}`,
      success: (data) => {
        that.setState({ data: data[0].bookings });
      },
      error: () => {
        console.log('error');
      },
    });
  }
  addInvalidDates(date) {
    const final = [];
    for (let i = 0; i < date.length; i += 1) {
      let correct = date[i].split('/');
      const last = correct.pop();
      correct.unshift(last);
      correct = correct.join('/');
      console.log(correct);
      final.push(moment(correct));
    }
    this.setState({ unavailableDates: final });
  }
  handleInvalidDates(option) {
    if (option === true) {
      console.log('not ready to book')
      this.setState({ invalidDate: true, readyToBook: false });
    } else {
      console.log('ready to book');
      this.setState(() => {
        return {
          invalidDate: false,
          readyToBook: true,
        };
      });
    }
  }
  handleGuest(adultAmount) {
    if (adultAmount >= 1) {
      this.setState({ guestReady: true });
    }
  }
  handleBook() {
    console.log('booked has ran');
    if (this.state.invalidDate === false && this.state.guestReady === true) {
      this.setState(() => {
        return {
          booked: 'Room has been booked',
        };
      });
    }
  }
  render() {
    return (
      <div className={BookingsMain}>
        <div className={Price}>
          <div className={Amount}>
            ${this.state.data.cost}
            <div className={Night}>  per night </div>
          </div>
          <Ratings ratingAmount={this.state.data.numberOfRatings} stars={this.state.data.rating} />
        </div>
        <div className={Line} />
        <div className={BookingOptions}>
          <Calendar handleInvalidDates={this.handleInvalidDates} ud={this.state.unavailableDates} id={this.props.id} fetchBooking={this.fetchBooking.bind(this)}/>
          <Guests children_allowed={this.state.data.childrenAllowed} guest_max={this.state.data.guestMax} handleGuest={this.handleGuest} toggleBook={this.toggleBook}/>
        </div>
        <button className={Fake} onClick={this.handleBook} />
        {this.state.renderBook === true
          ? <div className={BookingsMain}>
            {this.state.invalidDate === false ? <button className={Book} onClick={this.handleBook}> {this.state.booked}</button> : <button className={Book}> Dates not available</button>}
          </div>
          : null
        }
      </div>
    );
  }
}

window.Bookings = Bookings;
exports.Bookings = Bookings;
