import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  depositFiftyActionCreator,
  depositHundredActionCreator,
  withdrawFiftyActionCreator,
  withdrawHundredActionCreator,
} from '../store/index';

class Bank extends Component {
  constructor() {
    super();
    this.state = {
      customAmount: 0,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    // console.log('event.target.value: ', event.target.value);
    const newCustomAmount = event.target.value;
    this.setState({ customAmount: newCustomAmount });
  }

  render() {
    return (
      <div>
        <header>
          <img className="logo" src="/logo.jpeg" alt="React-Redux Bank" />

          <br />

          <div>React-Redux Bank</div>
        </header>

        <br />

        <h1 className="balance">$ {this.props.balance}</h1>

        <div className="atm">
          <button onClick={this.props.depositFifty} type="button">
            Deposit $50
          </button>

          <button onClick={this.props.depositHundred} type="button">
            Deposit $100
          </button>

          <button onClick={this.props.withdrawFifty} type="button">
            Withdraw $50
          </button>

          <button onClick={this.props.withdrawHundred} type="button">
            Withdraw $100
          </button>
        </div>

        <div className="atm">
          <label htmlFor="firstName">Custom Amount: </label>

          <input
            type="text"
            id="firstName"
            required
            pattern="[1-9]"
            title="Must contain numbers only"
            placeholder="Enter Amount Here"
            onChange={this.handleChange}
          />

          <button onClick={this.props.depositCustomAmount} type="button">
            Deposit
          </button>

          <button onClick={this.props.withdrawCustomAmount} type="button">
            Withdraw
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  balance: state.bankReducer.balance,
});

const mapDispatchToProps = dispatch => ({
  depositFifty() {
    dispatch(depositFiftyActionCreator());
  },
  depositHundred() {
    dispatch(depositHundredActionCreator());
  },
  withdrawFifty() {
    dispatch(withdrawFiftyActionCreator());
  },
  withdrawHundred() {
    dispatch(withdrawHundredActionCreator());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Bank);
