import React from 'react';
import styled from 'styled-components';
import { Main, Guest, SelectGuest, GuestChoices, MainGuestSelection, GuestMax, Choice, UpCount } from './Guests.css';

// const DisableChoice = Choice.extend`
//   color: grey;
//   border-color: grey;
// `;

 const UpCountMain = styled.div`
   width: 80px;
   height: 30px;
   font-size: 20px;
 `;
const Close = styled.button `
  width: 50px;
  align-self: flex-end;
  border: none;
  color: #55b0b2;
  &: hover {
    text-decoration: underline;
  }
`;

// const DisableCount = UpCount.extend`
//   color: grey;
//   border-color: grey;
// `;

let GuestSelection = (props) => {
    return (
     <div className={MainGuestSelection}>
      <div className={Choice}> <UpCountMain> Adult</UpCountMain> <button className={UpCount} onClick={ () => (props.handleAddGuest('adult', 'subtract'))}>-</button> {props.adultAmount}{props.maxHit === true ? <DisableCount> +</DisableCount> : <button className={UpCount} onClick={ () => (props.handleAddGuest('adult', 'add'))}>+</button>} </div>
      {props.childrenAllowed === true
        ? <Choice>  <UpCountMain>Children </UpCountMain> <button className={UpCount} onClick={ () => (props.handleAddGuest('children', 'subtract'))}>-</button> {props.childrenAmount}{props.maxHit === true ? <DisableCount> +</DisableCount> : <button className={UpCount} onClick={ () => (props.handleAddGuest('children', 'add'))}>+</button>} </Choice>
        : <DisableChoice>  <UpCountMain>Children </UpCountMain> <button className={UpCount}>-</button> {props.childrenAmount} <button className={UpCount}>+</button> </DisableChoice>
      }
      {props.childrenAllowed === true
        ? <Choice>  <UpCountMain>Infants </UpCountMain> <button className={UpCount} onClick={ () => (props.handleAddGuest('infant', 'subtract'))}>-</button> {props.infantAmount} {props.infantMaxHit === true ? <DisableCount>+ </DisableCount> : <button className={UpCount} onClick={ () => (props.handleAddGuest('infant', 'add'))}>+</button>} </Choice>
        : <DisableChoice>  <UpCountMain>Infants </UpCountMain> <button className={UpCount}>-</button> {props.infantAmount} <button className={UpCount}>+</button> </DisableChoice>
      }
      <div className={GuestMax}> {props.guestMax} guests maximum. Infants don’t count toward the number of guests.</div>
      <Close onClick={props.close}> Close</Close>
     </div>
    )


}

class Guests extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      guestAmount: 1,
      adultAmount: 1,
      childrenAmount: 0,
      infantAmount: 0,
      showComponent: false,
      maxHit: false,
      infantMaxHit: false
    }
    this.toggleShowComponent = this.toggleShowComponent.bind(this);
    this.handleAddGuest = this.handleAddGuest.bind(this);
  }
  toggleShowComponent () {
    {this.state.showComponent === false
      ? this.setState(() => ({
        showComponent: true
      }))
      : this.setState(() => ({
        showComponent: false
      }))
    }
    this.props.handleGuest(this.state.adultAmount);
    this.props.toggleBook();
  }
  componentDidMount() {
    this.props.handleGuest(this.state.adultAmount);
  }
  handleAddGuest (guest, option) {
    let stateOption = guest + 'Amount';
    console.log(stateOption);
    let totalGuest = this.state.guestAmount + 1;
    let totalGuestMinus = this.state.guestAmount - 1;
    if(guest === 'infant'){
       if(option === 'add'){
        let newAmount = this.state[stateOption] + 1;
        if(newAmount <= 6){
          this.setState(() => ({[stateOption] : newAmount}))
        } else {
          this.setState(() => ({infantMaxHit : true}))
        }
      } else if (option === 'subtract'){
        let newAmount = this.state[stateOption] - 1;
        console.log(totalGuestMinus);
        if(newAmount >= 0){
          this.setState(() => ({[stateOption] : newAmount, infantMaxHit: false}))
        } else {
          this.setState(() => ({infantMaxHit : false}))
        }
      }

    } else {
      if(option === 'add'){
        let newAmount = this.state[stateOption] + 1;
        if(totalGuest <= this.props.guest_max){
          this.setState(() => ({[stateOption] : newAmount, maxHit : false, guestAmount: totalGuest}))
        } else {
          this.setState(() => ({maxHit : true}))
        }
      } else if (option === 'subtract'){
        let newAmount = this.state[stateOption] - 1;
        console.log(totalGuestMinus);
        if(totalGuestMinus >= 0 && newAmount >= 0){
          this.setState(() => ({[stateOption] : newAmount, maxHit : false, guestAmount: totalGuestMinus}))
        } else {
          this.setState(() => ({maxHit : false}))
        }
      }
    }

  }
  render () {
    return (
      <div className={Main}>
        <div className={Guest}> Guests </div>
        <button className={SelectGuest} onClick={this.toggleShowComponent}>
         {this.state.guestAmount} Guest
        </button>
        {this.state.showComponent
          ? <div className={GuestChoices}>
              <GuestSelection
                handleAddGuest={this.handleAddGuest}
                guestMax={this.props.guest_max}
                close={this.toggleShowComponent}
                adultAmount={this.state.adultAmount}
                childrenAmount={this.state.childrenAmount}
                infantAmount={this.state.infantAmount}
                childrenAllowed={this.props.children_allowed}
                maxHit={this.state.maxHit}
                infantMaxHit={this.state.infantMaxHit}
              />
            </div>
          : null
        }

      </div>


    )
  }
}

export default Guests;