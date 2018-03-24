import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { Bookings } from './components/Bookings';

const App = ({id}) => (
      <Router>
        <div>
          <Route path='/' exact render={(props) => {
            return  <Bookings {...props} />
          }} />
          <Route path='/:bookings/:id' id={id} component={Bookings} />
        </div>
      </Router>
);

ReactDOM.render(<App />, document.getElementById('app'));
window.Bookings = App;
export default App;
