import React from 'react';
import MdClear from 'react-icons/lib/md/clear';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { Bookings } from './components/Bookings';

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