import React from 'react';
import { Main } from './BookingPrices.css';

class BookingPrices extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      starsArr: []
    };
  }
  render(props) {
    return (
      <button className={Main} />
    );
  }
}

export default BookingPrices