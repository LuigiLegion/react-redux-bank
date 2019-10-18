import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  convertCurrencyThunkCreator,
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
    console.log('handleConvert');

    const newSourceCurrency = this.state.targetCurrency;
    const newTargetCurrency = this.state.sourceCurrency;

    if (newSourceCurrency === '$') {
      this.props.convertCurrency('USD', 'EUR');
    } else {
      this.props.convertCurrency('EUR', 'USD');
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
          <img className="logo" src="/logo.jpeg" alt="React-Redux Bank" />

          <br />

          <div>React-Redux Bank</div>
        </header>

        <br />

        <div className="atm">
          <h1 className="balance">
            {this.state.sourceCurrency} {this.props.balance.toFixed(2)}
          </h1>

          <button onClick={this.handleConvert} type="button">
            Convert to {this.state.targetCurrency}
          </button>
        </div>

        <div className="atm">
          <button onClick={this.props.depositFifty} type="button">
            Deposit {this.state.sourceCurrency} 50
          </button>

          <button onClick={this.props.depositHundred} type="button">
            Deposit {this.state.sourceCurrency} 100
          </button>

          <button onClick={this.props.withdrawFifty} type="button">
            Withdraw {this.state.sourceCurrency} 50
          </button>

          <button onClick={this.props.withdrawHundred} type="button">
            Withdraw {this.state.sourceCurrency} 100
          </button>
        </div>

        <div className="atm">
          {/* <label htmlFor="customAmount">
            Custom Amount:{' '}
          </label> */}

          <div>
            <input
              type="text"
              id="customAmount"
              required
              placeholder="Enter Custom Amount Here"
              onChange={this.handleChange}
            />
          </div>

          <br />

          <button
            onClick={event => this.handleClick(event)}
            type="button"
            value="Deposit"
          >
            Deposit
          </button>

          <button
            onClick={event => this.handleClick(event)}
            type="button"
            value="Withdraw"
          >
            Withdraw
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
  convertCurrency(sourceCurrency, targetCurrency) {
    dispatch(convertCurrencyThunkCreator(sourceCurrency, targetCurrency));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Bank);
