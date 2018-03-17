import React from 'react';

import Calendar from './Calendar.jsx';
import Ratings from './Ratings.jsx';
import Guests from './Guests.jsx';
import MdClear from 'react-icons/lib/md/clear';
import BookingPrices from './BookingPrices.jsx';
import axios from 'axios';
import moment from 'moment';

import { BookingsMain, Price, Amount, Night, Book, Fake, Line, BookingOptions } from './Bookings.css';

class Bookings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data : {"id":1,"unavailable_dates":["3/27/2018","3/7/2018","5/26/2018","3/3/2018","4/10/2018","4/23/2018","4/16/2018","4/22/2018","3/31/2018","4/2/2018","2/25/2018","5/10/2018","5/24/2018","4/8/2018","5/18/2018","3/21/2018","4/9/2018","2/25/2018","5/21/2018","5/3/2018","5/23/2018","3/13/2018","3/16/2018","4/17/2018","5/25/2018","4/9/2018","5/19/2018","4/30/2018","3/13/2018","4/1/2018","5/14/2018","4/8/2018","3/12/2018"],"rating":3,"rating_amount":81,"guest_max":4,"cost":187,"min_stay":3,"max_stay":25,"children_allowed":true},
      invalidDate: false,
      readyToBook: false,
      booked: 'Book',
      renderBook: true,
      unavailableDates: [moment('2018/3/20')]
    }
    this.handleInvalidDates = this.handleInvalidDates.bind(this);
    this.handleBook = this.handleBook.bind(this);
    this.fetchInfo = this.fetchInfo.bind(this);
    this.handleGuest = this.handleGuest.bind(this);
    this.toggleBook = this.toggleBook.bind(this);
    this.addInvalidDates = this.addInvalidDates.bind(this);
  }
  componentDidMount() {
    this.fetchInfo();
    let id = this.props.match.params.id;
    const context = this;
    let arr = [];
    axios.get(`http://localhost:3002/api/bookings/${id}`)
      .then((response) => {
        context.addInvalidDates(response.data[0].unavailableDates);
        context.setState(() => {
          return {
            data: response.data[0],
          };
        });
      })
      .catch((error) => {
        console.log('error', error);
      });
    console.log('here', this.state.data.unavailableDates);
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
  fetchInfo() {
    // return this.state.unavailableDates;
    let id = this.props.match.params.id;
    let context = this;
    var arr = [];
    axios.get(`http://localhost:3002/api/bookings/${id}`)
      .then((response) => {
        context.addInvalidDates(response.data[0].unavailableDates);
        context.setState(() =>{
          return {
            data: response.data[0],
          };
        });
      })
      .catch((error) => {
        console.log('error', error);
      });
    console.log('here', this.state.data.unavailableDates);
  }
  addInvalidDates (date) {
    console.log(date[0]);
    console.log()
    var final = [];
    for(let i = 0; i < date.length; i += 1) {
      let correct = date[i].split('/');
      let last = correct.pop();
      correct.unshift(last);
      correct = correct.join('/');
      console.log(correct);
      final.push(moment(correct));
    }
    this.setState(() => {
      return {
        unavailableDates: final
      }
    })
  }
  handleInvalidDates(option) {
    if (option === true) {
      console.log('not ready to book')
      this.setState(() => {
        return {
          invalidDate: true,
          readyToBook: false,
        };
      });
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
      this.setState(() => {
        return {
          guestReady: true,
        };
      });
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
          <Ratings ratingAmount={this.state.data.numberOfRatings} stars={this.state.data.rating}/>
        </div>
        <div className={Line}/>
        <div className={BookingOptions}>
        <Calendar handleInvalidDates={this.handleInvalidDates} ud={this.state.unavailableDates} fetchInfo={this.fetchInfo.bind(this)}/>
        <Guests children_allowed={this.state.data.childrenAllowed} guest_max={this.state.data.guestMax} handleGuest={this.handleGuest} toggleBook={this.toggleBook}/>
        </div>
        <button className={Fake} onClick={this.handleBook}></button>
        {this.state.renderBook === true
          ? <div className={BookingsMain}>
              {this.state.invalidDate === false ? <button className={Book} onClick={this.handleBook}> {this.state.booked}</button> : <button className={Book}> Dates not available</button>}
            </div>
          : null
        }
      </div>
    )
  }
}

exports.Bookings = Bookings;