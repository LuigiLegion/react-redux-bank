// Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  depositCustomAmountActionCreator,
  depositFiftyActionCreator,
  depositHundredActionCreator,
  withdrawCustomAmountActionCreator,
  withdrawFiftyActionCreator,
  withdrawHundredActionCreator,
  convertCurrencyThunkCreator,
} from '../store/reducers/bankReducer';

// Component
class Atm extends Component {
  constructor() {
    super();
    this.state = {
      sourceCurrency: '$',
      targetCurrency: '€',
      customAmount: 0,
      invalidCustomAmount: false,
      disabledCustomAmount: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleConvert = this.handleConvert.bind(this);
  }

  handleChange(event) {
    const curCustomAmount = event.target.value;

    if (!curCustomAmount.length) {
      this.setState({
        invalidCustomAmount: false,
        disabledCustomAmount: true,
      });
    } else if (isNaN(Number(curCustomAmount))) {
      this.setState({
        invalidCustomAmount: true,
        disabledCustomAmount: true,
      });
    } else {
      this.setState({
        customAmount: Number(curCustomAmount),
        invalidCustomAmount: false,
        disabledCustomAmount: false,
      });
    }
  }

  handleClick(event) {
    const curButtonType = event.target.value;

    if (curButtonType === 'Deposit') {
      this.props.depositCustomAmountAction(this.state.customAmount);
    } else if (curButtonType === 'Withdraw') {
      this.props.withdrawCustomAmountAction(this.state.customAmount);
    }
  }

  handleConvert() {
    if (this.state.sourceCurrency === '$') {
      this.props.convertCurrencyThunk('USD', 'EUR');
    } else {
      this.props.convertCurrencyThunk('EUR', 'USD');
    }

    this.setState(prevState => ({
      sourceCurrency: prevState.targetCurrency,
      targetCurrency: prevState.sourceCurrency,
    }));
  }

  render() {
    const {
      sourceCurrency,
      targetCurrency,
      invalidCustomAmount,
      disabledCustomAmount,
    } = this.state;
    const {
      balance,
      depositFiftyAction,
      depositHundredAction,
      withdrawFiftyAction,
      withdrawHundredAction,
    } = this.props;

    return (
      <div className="atm">
        <div className="terminal">
          <h1 className="balance">
            {sourceCurrency} {balance.toFixed(2)}
          </h1>

          <button onClick={this.handleConvert} type="button">
            <span>Convert to </span>

            <span className="text-style-bold">{targetCurrency}</span>
          </button>
        </div>

        <div className="terminal">
          <button type="button" onClick={depositFiftyAction}>
            Deposit {sourceCurrency} 50
          </button>

          <button type="button" onClick={withdrawFiftyAction}>
            Withdraw {sourceCurrency} 50
          </button>

          <button type="button" onClick={depositHundredAction}>
            Deposit {sourceCurrency} 100
          </button>

          <button type="button" onClick={withdrawHundredAction}>
            Withdraw {sourceCurrency} 100
          </button>
        </div>

        <div className="terminal">
          <div className="custom-amount-container">
            <input
              className="custom-amount-containee"
              type="text"
              placeholder="Enter Custom Amount"
              required
              onChange={this.handleChange}
            />
          </div>

          <button
            type="button"
            value="Deposit"
            disabled={disabledCustomAmount}
            onClick={this.handleClick}
          >
            Deposit {sourceCurrency}
          </button>

          <button
            type="button"
            value="Withdraw"
            disabled={disabledCustomAmount}
            onClick={this.handleClick}
          >
            Withdraw {sourceCurrency}
          </button>
        </div>

        {invalidCustomAmount ? (
          <div className="terminal">
            Invalid Custom Amount! Please Try Again.
          </div>
        ) : null}
      </div>
    );
  }
}

// Container
const mapStateToProps = state => ({
  balance: state.bank.balance,
});

const mapDispatchToProps = dispatch => ({
  depositFiftyAction() {
    dispatch(depositFiftyActionCreator());
  },
  depositHundredAction() {
    dispatch(depositHundredActionCreator());
  },
  depositCustomAmountAction(customAmount) {
    dispatch(depositCustomAmountActionCreator(customAmount));
  },
  withdrawFiftyAction() {
    dispatch(withdrawFiftyActionCreator());
  },
  withdrawHundredAction() {
    dispatch(withdrawHundredActionCreator());
  },
  withdrawCustomAmountAction(customAmount) {
    dispatch(withdrawCustomAmountActionCreator(customAmount));
  },
  convertCurrencyThunk(sourceCurrency, targetCurrency) {
    dispatch(convertCurrencyThunkCreator(sourceCurrency, targetCurrency));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Atm);
