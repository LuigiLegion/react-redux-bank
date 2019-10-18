import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  depositCustomAmountActionCreator,
  depositFiftyActionCreator,
  depositHundredActionCreator,
  withdrawCustomAmountActionCreator,
  withdrawFiftyActionCreator,
  withdrawHundredActionCreator,
} from '../store/index';

class Bank extends Component {
  constructor() {
    super();
    this.state = {
      // Here are two additional fields in local state - sourceCurrency and targetCurrency.

      // Please use them to show users the correct currency symbol throughout the app every time they convert their currency, rather than hardcode it.

      sourceCurrency: '$',
      targetCurrency: '€',
      customAmount: 0,
      invalidCustomAmount: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleConvert = this.handleConvert.bind(this);
  }

  handleChange(event) {
    const curCustomAmount = Number(event.target.value);

    if (isNaN(curCustomAmount)) {
      this.setState({ invalidCustomAmount: true });
    } else {
      this.setState({
        customAmount: curCustomAmount,
        invalidCustomAmount: false,
      });
    }
  }

  handleClick(event) {
    const curButtonType = event.target.value;

    if (curButtonType === 'Deposit') {
      this.props.depositCustomAmount(this.state.customAmount);
    } else if (curButtonType === 'Withdraw') {
      this.props.withdrawCustomAmount(this.state.customAmount);
    }
  }

  handleConvert() {
    const newSourceCurrency = this.state.targetCurrency;
    const newTargetCurrency = this.state.sourceCurrency;

    if (newSourceCurrency === '$') {
      // Don't forget to plug in your Thunk after you map your Thunk Creator to props.
    } else {
      // Remember, currency conversion can go both ways.
    }

    this.setState({
      sourceCurrency: newSourceCurrency,
      targetCurrency: newTargetCurrency,
    });
  }

  render() {
    const { invalidCustomAmount } = this.state;

    return (
      <div>
        <header>
          <img
            className="logo"
            src="/logo.jpeg"
            alt="React-Redux International Bank"
          />

          <br />

          <div>React-Redux International Bank</div>
        </header>

        <br />

        <div className="atm">
          <h1 className="balance">
            {`$ ${this.props.balance}`}

            {/*
            What is wrong with the way we are bringing in the balance after converting it?

            Look into the toFixed method
            (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed)
            */}
          </h1>

          <button onClick={this.handleConvert} type="button">
            Convert to €
          </button>
        </div>

        <div className="atm">
          <button onClick={this.props.depositFifty} type="button">
            Deposit $ 50
          </button>

          <button onClick={this.props.depositHundred} type="button">
            Deposit $ 100
          </button>

          <button onClick={this.props.withdrawFifty} type="button">
            Withdraw $ 50
          </button>

          <button onClick={this.props.withdrawHundred} type="button">
            Withdraw $ 100
          </button>
        </div>

        <div className="atm">
          <div>
            <input
              type="text"
              id="customAmount"
              required
              placeholder="Enter Custom Amount"
              onChange={this.handleChange}
            />
          </div>

          <br />

          <button
            onClick={event => this.handleClick(event)}
            type="button"
            value="Deposit"
          >
            Deposit $
          </button>

          <button
            onClick={event => this.handleClick(event)}
            type="button"
            value="Withdraw"
          >
            Withdraw $
          </button>
        </div>

        {invalidCustomAmount ? (
          <div className="atm">Invalid Custom Amount! Please Try Again.</div>
        ) : null}
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
  depositCustomAmount(customAmount) {
    dispatch(depositCustomAmountActionCreator(customAmount));
  },
  withdrawFifty() {
    dispatch(withdrawFiftyActionCreator());
  },
  withdrawHundred() {
    dispatch(withdrawHundredActionCreator());
  },
  withdrawCustomAmount(customAmount) {
    dispatch(withdrawCustomAmountActionCreator(customAmount));
  },
  // Make sure you import your newly made Thunk Creator and plug it into mapDispatchToProps properly.

  convertCurrencyThunk() {
    // Will this thunk receive arguments?

    // If so, make sure you declare parameters to bring in said arguments.

    // Don't forget to pass them into dispatch properly.
    dispatch();
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Bank);
