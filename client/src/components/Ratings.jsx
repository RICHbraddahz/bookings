import React from 'react';
import FaStar from 'react-icons/lib/fa/star';
import { RatingsMain, Stars, RatingsAmount } from './Ratings.css';

const Ratings = ({ stars, ratingAmount }) => {
  const starsArr = [];
  for (let i = 0; i < stars; i += 1) {
    starsArr.push(<FaStar />);
  }
  return (
    <div className={RatingsMain}>
      <div className={Stars}>
        {starsArr}
      </div>
      <div className={RatingsAmount}>{ratingAmount}</div>
    </div>
  );
};

export default Ratings;
