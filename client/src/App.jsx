import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
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