// Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

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

  handleConvert() {
    if (this.state.sourceCurrency === '$') {
      this.props.convertCurrencyThunk('USD', 'EUR');
    } else {
      this.props.convertCurrencyThunk('EUR', 'USD');
    }

    this.setState(prevState => ({
      ...prevState,
      sourceCurrency: prevState.targetCurrency,
      targetCurrency: prevState.sourceCurrency,
    }));
  }

  render() {
    const {
      sourceCurrency,
      targetCurrency,
      customAmount,
      invalidCustomAmount,
      disabledCustomAmount,
    } = this.state;
    const {
      balance,
      transactions,
      depositFiftyAction,
      depositHundredAction,
      depositCustomAmountAction,
      withdrawFiftyAction,
      withdrawHundredAction,
      withdrawCustomAmountAction,
    } = this.props;

    return (
      <div className="atm">
        <div className="terminal">
          <h1 className="balance">
            {sourceCurrency} {balance.toFixed(2)}
          </h1>

          <button type="button" onClick={this.handleConvert}>
            <span>Convert to </span>

            <span className="text-style-bold">{targetCurrency}</span>
          </button>
        </div>

        <div className="terminal">
          <button
            type="button"
            onClick={() => depositFiftyAction(sourceCurrency)}
          >
            Deposit {sourceCurrency} 50
          </button>

          <button
            type="button"
            onClick={() => withdrawFiftyAction(sourceCurrency)}
          >
            Withdraw {sourceCurrency} 50
          </button>

          <button
            type="button"
            onClick={() => depositHundredAction(sourceCurrency)}
          >
            Deposit {sourceCurrency} 100
          </button>

          <button
            type="button"
            onClick={() => withdrawHundredAction(sourceCurrency)}
          >
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
            disabled={disabledCustomAmount}
            onClick={() =>
              depositCustomAmountAction(sourceCurrency, customAmount)
            }
          >
            Deposit {sourceCurrency}
          </button>

          <button
            type="button"
            disabled={disabledCustomAmount}
            onClick={() =>
              withdrawCustomAmountAction(sourceCurrency, customAmount)
            }
          >
            Withdraw {sourceCurrency}
          </button>
        </div>

        {invalidCustomAmount ? (
          <div className="terminal">
            Invalid Custom Amount! Please Try Again.
          </div>
        ) : null}

        <div className="terminal">
          {transactions && transactions.length ? (
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Balance</th>
                </tr>
              </thead>

              <tbody>
                {transactions.map(transaction => (
                  <tr key={transaction.date}>
                    <th>{moment(transaction.date).format('L')}</th>
                    <th>{transaction.type}</th>
                    <th>
                      {transaction.type === 'Deposit'
                        ? `+${transaction.currency}${transaction.amount.toFixed(
                            2
                          )}`
                        : transaction.type === 'Withdraw'
                        ? `-${transaction.currency}${transaction.amount.toFixed(
                            2
                          )}`
                        : transaction.amount}
                    </th>
                    <th>
                      {transaction.currency}
                      {transaction.balance.toFixed(2)}
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div>No transactions were found.</div>
          )}
        </div>
      </div>
    );
  }
}

// Container
const mapStateToProps = state => ({
  balance: state.bank.balance,
  transactions: state.bank.transactions,
});

const mapDispatchToProps = dispatch => ({
  depositFiftyAction(sourceCurrency) {
    dispatch(depositFiftyActionCreator(sourceCurrency));
  },
  depositHundredAction(sourceCurrency) {
    dispatch(depositHundredActionCreator(sourceCurrency));
  },
  depositCustomAmountAction(sourceCurrency, customAmount) {
    dispatch(depositCustomAmountActionCreator(sourceCurrency, customAmount));
  },
  withdrawFiftyAction(sourceCurrency) {
    dispatch(withdrawFiftyActionCreator(sourceCurrency));
  },
  withdrawHundredAction(sourceCurrency) {
    dispatch(withdrawHundredActionCreator(sourceCurrency));
  },
  withdrawCustomAmountAction(sourceCurrency, customAmount) {
    dispatch(withdrawCustomAmountActionCreator(sourceCurrency, customAmount));
  },
  convertCurrencyThunk(sourceCurrency, targetCurrency) {
    dispatch(convertCurrencyThunkCreator(sourceCurrency, targetCurrency));
  },
});

// Prop Types
Atm.propTypes = {
  balance: PropTypes.number,
  transactions: PropTypes.array,
  depositFiftyAction: PropTypes.func,
  depositHundredAction: PropTypes.func,
  depositCustomAmountAction: PropTypes.func,
  withdrawFiftyAction: PropTypes.func,
  withdrawHundredAction: PropTypes.func,
  withdrawCustomAmountAction: PropTypes.func,
  convertCurrencyThunk: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Atm);
