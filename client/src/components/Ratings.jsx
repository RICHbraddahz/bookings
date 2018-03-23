import React from 'react';
import FaStar from 'react-icons/lib/fa/star';
import { RatingsMain, Stars, RatingsAmount } from './Ratings.css';

const Ratings = ({ stars, ratingAmount }) => {
  let starsArr = [];
  for (let i = 0; i < stars; i++) {
  // note: we add a key prop here to allow react to uniquely identify each
  // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
    starsArr.push(<FaStar/>);
  }

  return (
    <div className={RatingsMain}>
      <div className={Stars}>
        {starsArr}
      </div>
      <div className={RatingsAmount}>{ratingAmount}</div>
    </div>
  )
}

export default Ratings;