import React from 'react';
import FaStar from 'react-icons/lib/fa/star';
import { RatingsMain, Stars, RatingsAmount } from './Ratings.css';

class Ratings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      starsArr : [],
    };
    this.calculateStars = this.calculateStars.bind(this);
  }
  componentDidMount () {
    this.calculateStars();
  }
  calculateStars () {
    var stars = this.props.stars;
    var starsArr = [];
    for (let i = 0; i < this.props.stars; i += 1) {
      starsArr.push(<FaStar/>);
    }
    this.setState(function(){
      return {
        starsArr: starsArr
      }
    })
  }
  render(props) {

    return (
      <div className={RatingsMain}>
        <div className={Stars}>
          {this.state.starsArr.map(item => (
            item
          ))}
        </div>
        <div className={RatingsAmount}>{this.props.ratingAmount}</div>
      </div>
    )
  }
}

export default Ratings;