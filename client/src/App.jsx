import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { Bookings } from './components/Bookings';

// const App = ({id}) => (
//       <Router>
//         <div>
//           <Route path='/' exact render={(props) => {
//             return  <Bookings {...props} />
//           }} />
//           <Route path='/:bookings/:id' id={id} component={Bookings} />
//         </div>
//       </Router>
// );

const App = ({ id }) => (
  <div>
    <Bookings id={id} />
  </div>
)

export default App;
// ReactDOM.render(<App />, document.getElementById('app'));
window.App = App;
