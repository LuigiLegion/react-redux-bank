// Imports
import React from 'react';
import { connect } from 'react-redux';

import { depositFiftyActionCreator } from '../store/reducers/bankReducer';

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

        <button type="button" onClick={() => console.log('Withdraw $ 50')}>
          Withdraw $ 50
        </button>

        <button type="button" onClick={() => console.log('Deposit $ 100')}>
          Deposit $ 100
        </button>

        <button type="button" onClick={() => console.log('Withdraw $ 100')}>
          Withdraw $ 100
        </button>
      </div>
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
  };
};
// Please refactor mapStateToProps and mapDispatchToProps into implicitly returning functions rather than explicitly returning ones once you get everything up and running

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Atm);
