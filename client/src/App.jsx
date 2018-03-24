import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { Bookings } from './components/Bookings';

const App = () => (
      <Router>
        <div>
          <Route path='/' exact render={(props) => {
            return  <Bookings {...props} />
          }} />
          <Route path='/:bookings/:id' component={Bookings} />
        </div>
      </Router>
);

export default App;
