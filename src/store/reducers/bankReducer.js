// Initial State
const initialState = {
  balance: 0,
};

// Actions Types
const DEPOSIT_FIFTY = 'DEPOSIT_FIFTY';

// Action Creators
export const depositFiftyActionCreator = () => ({
  type: DEPOSIT_FIFTY,
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

    default:
      return state;
  }
};

// Exports
export default bankReducer;
