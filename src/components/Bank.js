import React from 'react';
import { connect } from 'react-redux';

const Bank = props => {
  return (
    <div>
      <header>
        <img className="logo" src="/logo.jpeg" alt="React-Redux Bank" />
        <br />
        <div>React-Redux Bank</div>
      </header>
      <br />
      <h1 className="balance">$ 0</h1>
      <div className="atm">
        <button type="button">Deposit $50</button>
        <button type="button">Deposit $100</button>
        <button type="button">Withdraw $50</button>
        <button type="button">Withdraw $100</button>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  console.log('state in mapStateToProps: ', state);

  return {};
};

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Bank);
