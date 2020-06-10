// Initial State
const initialState = {
  balance: 0,
};

// Actions Types
const DEPOSIT_FIFTY = 'DEPOSIT_FIFTY';
const DEPOSIT_HUNDRED = 'DEPOSIT_HUNDRED';
const WITHDRAW_FIFTY = 'WITHDRAW_FIFTY';
const WITHDRAW_HUNDRED = 'WITHDRAW_HUNDRED';

// Action Creators
export const depositFiftyActionCreator = () => ({
  type: DEPOSIT_FIFTY,
});

export const depositHundredActionCreator = () => ({
  type: DEPOSIT_HUNDRED,
});

export const withdrawFiftyActionCreator = () => ({
  type: WITHDRAW_FIFTY,
});

export const withdrawHundredActionCreator = () => ({
  type: WITHDRAW_HUNDRED,
});

// Reducer
const bankReducer = (state = initialState, action) => {
  switch (action.type) {
    // Your cases here
    case DEPOSIT_FIFTY:
      return {
        ...state,
        balance: state.balance + 50,
      };

    case DEPOSIT_HUNDRED:
      return {
        ...state,
        balance: state.balance + 100,
      };

    case WITHDRAW_FIFTY:
      return {
        ...state,
        balance: state.balance - 50,
      };

    case WITHDRAW_HUNDRED:
      return {
        ...state,
        balance: state.balance - 100,
      };

    default:
      return state;
  }
};

// Exports
export default bankReducer;
