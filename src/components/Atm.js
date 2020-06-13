// Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

import {
  getBalanceAndTransactionsActionCreator,
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
      invalidAmount: false,
      disabledCustomAmount: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleDeposit = this.handleDeposit.bind(this);
    this.handleWithdraw = this.handleWithdraw.bind(this);
    this.handleConvert = this.handleConvert.bind(this);
  }

  componentDidMount() {
    if (localStorage.reactReduxBank) {
      try {
        const cache = localStorage.getItem('reactReduxBank');
        const {
          balance,
          transactions,
          sourceCurrency,
          targetCurrency,
        } = JSON.parse(cache);

        this.props.getBalanceAndTransactionsAction(balance, transactions);

        this.setState({
          sourceCurrency,
          targetCurrency,
        });
      } catch (error) {
        console.error(error);
      }
    }
  }

  componentDidUpdate() {
    localStorage.setItem(
      'reactReduxBank',
      JSON.stringify({
        balance: this.props.balance,
        transactions: this.props.transactions,
        sourceCurrency: this.state.sourceCurrency,
        targetCurrency: this.state.targetCurrency,
      })
    );
  }

  handleChange(event) {
    const curCustomAmountStr = event.target.value;
    const curCustomAmountNum = Number(curCustomAmountStr);

    if (!curCustomAmountStr.length) {
      this.setState({
        invalidAmount: false,
        disabledCustomAmount: true,
      });
    } else if (isNaN(curCustomAmountNum) || curCustomAmountNum <= 0) {
      this.setState({
        invalidAmount: true,
        disabledCustomAmount: true,
      });
    } else {
      this.setState({
        customAmount: curCustomAmountNum,
        invalidAmount: false,
        disabledCustomAmount: false,
      });
    }
  }

  handleDeposit(event) {
    const curAmount = Number(event.target.value);

    this.setState({ invalidAmount: false });

    switch (curAmount) {
      case 50:
        return this.props.depositFiftyAction(this.state.sourceCurrency);

      case 100:
        return this.props.depositHundredAction(this.state.sourceCurrency);

      default:
        return this.props.depositCustomAmountAction(
          this.state.sourceCurrency,
          this.state.customAmount
        );
    }
  }

  handleWithdraw(event) {
    const curAmount = Number(event.target.value);

    if (this.props.balance - curAmount >= 0) {
      this.setState({ invalidAmount: false });

      switch (curAmount) {
        case 50:
          return this.props.withdrawFiftyAction(this.state.sourceCurrency);

        case 100:
          return this.props.withdrawHundredAction(this.state.sourceCurrency);

        default:
          return this.props.withdrawCustomAmountAction(
            this.state.sourceCurrency,
            this.state.customAmount
          );
      }
    } else {
      this.setState({ invalidAmount: true });
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
      invalidAmount,
      disabledCustomAmount,
    } = this.state;
    const { balance, transactions } = this.props;

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
          <button type="button" value="50" onClick={this.handleDeposit}>
            Deposit {sourceCurrency} 50
          </button>

          <button type="button" value="50" onClick={this.handleWithdraw}>
            Withdraw {sourceCurrency} 50
          </button>

          <button type="button" value="100" onClick={this.handleDeposit}>
            Deposit {sourceCurrency} 100
          </button>

          <button type="button" value="100" onClick={this.handleWithdraw}>
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
            value={customAmount}
            disabled={disabledCustomAmount}
            onClick={this.handleDeposit}
          >
            Deposit {sourceCurrency}
          </button>

          <button
            type="button"
            value={customAmount}
            disabled={disabledCustomAmount}
            onClick={this.handleWithdraw}
          >
            Withdraw {sourceCurrency}
          </button>
        </div>

        {invalidAmount ? (
          <div className="terminal">Invalid Amount! Please Try Again.</div>
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
                    <td>{moment(transaction.date).format('L')}</td>
                    <td>{transaction.type}</td>
                    <td>
                      {`${
                        transaction.type === 'Deposit'
                          ? `+${
                              transaction.currency
                            }${transaction.amount.toFixed(2)}`
                          : transaction.type === 'Withdraw'
                          ? `-${
                              transaction.currency
                            }${transaction.amount.toFixed(2)}`
                          : transaction.amount
                      }`}
                    </td>
                    <td>
                      {`${transaction.currency}${transaction.balance.toFixed(
                        2
                      )}`}
                    </td>
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
  getBalanceAndTransactionsAction(balance, transactions) {
    dispatch(getBalanceAndTransactionsActionCreator(balance, transactions));
  },
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
  getBalanceAndTransactionsAction: PropTypes.func,
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
