import React from 'react';
import Calendar from './components/Calendar.jsx';
import Ratings from './components/Ratings.jsx';
import Guests from './components/Guests.jsx';
import MdClear from 'react-icons/lib/md/clear';
import BookingPrices from './components/BookingPrices.jsx';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { Bookings } from './components/Bookings.jsx';
import { BookingsMain, Price, Amount, Night, Book, Fake, Line, BookingOptions } from './App.css';




export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route path='/' exact render={(props) => {
            return  <Bookings {...props} />
          }} />
          <Route path='/:bookings/:id' component={Bookings} />
        </div>
      </Router>
    );
  }
}