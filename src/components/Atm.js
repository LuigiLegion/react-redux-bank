// Imports
import React from 'react';
import { connect } from 'react-redux';

import {
  depositFiftyActionCreator,
  depositHundredActionCreator,
  withdrawFiftyActionCreator,
  withdrawHundredActionCreator,
} from '../store/reducers/bankReducer';

// Component
function Atm(props) {
  console.log({ props });

  return (
    <div className="atm">
      <div className="terminal">
        <h1 className="balance">$ {props.balance}</h1>
      </div>

      <div className="terminal">
        <button type="button" onClick={() => props.depositFiftyAction()}>
          Deposit $ 50
        </button>

        <button type="button" onClick={() => props.withdrawFiftyAction()}>
          Withdraw $ 50
        </button>

        <button type="button" onClick={() => props.depositHundredAction()}>
          Deposit $ 100
        </button>

        <button type="button" onClick={() => props.withdrawHundredAction()}>
          Withdraw $ 100
        </button>
      </div>

      <div className="terminal">
        <div className="custom-amount-container">
          <input
            className="custom-amount-containee"
            type="text"
            placeholder="Enter Custom Amount"
            required
            onChange={event => console.log(event.target.value)}
          />
        </div>

        <button
          type="button"
          value="Deposit"
          disabled={false}
          onClick={() => console.log('Deposit Custom Amount')}
        >
          Deposit $
        </button>

        <button
          type="button"
          value="Withdraw"
          disabled={false}
          onClick={() => console.log('Withdraw Custom Amount')}
        >
          Withdraw $
        </button>
      </div>

      <div className="terminal">Invalid Custom Amount! Please Try Again.</div>
    </div>
  );
}

// Container
const mapStateToProps = state => {
  console.log('state in mapStateToProps: ', state);

  return {
    balance: state.bank.balance,
  };
};

const mapDispatchToProps = dispatch => {
  console.log('dispatch in mapDispatchToProps: ', dispatch);

  return {
    depositFiftyAction() {
      dispatch(depositFiftyActionCreator());
    },
    depositHundredAction() {
      dispatch(depositHundredActionCreator());
    },
    withdrawFiftyAction() {
      dispatch(withdrawFiftyActionCreator());
    },
    withdrawHundredAction() {
      dispatch(withdrawHundredActionCreator());
    },
  };
};
// Please refactor mapStateToProps and mapDispatchToProps into implicitly returning functions rather than explicitly returning ones once you get everything up and running

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Atm);
