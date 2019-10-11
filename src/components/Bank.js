import React from 'react';
import { connect } from 'react-redux';
import {
  depositFiftyActionCreator,
  depositHundredActionCreator,
  withdrawFiftyActionCreator,
  withdrawHundredActionCreator,
} from '../store/index';

const Bank = props => {
  return (
    <div>
      <header>
        <img className="logo" src="/logo.jpeg" alt="React-Redux Bank" />
        <br />
        <div>React-Redux Bank</div>
      </header>
      <br />
      <h1 className="balance">$ {props.balance}</h1>
      <div className="atm">
        <button onClick={props.depositFifty} type="button">
          Deposit $50
        </button>
        <button onClick={props.depositHundred} type="button">
          Deposit $100
        </button>
        <button onClick={props.withdrawFifty} type="button">
          Withdraw $50
        </button>
        <button onClick={props.withdrawHundred} type="button">
          Withdraw $100
        </button>
      </div>
    </div>
  );
};

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
