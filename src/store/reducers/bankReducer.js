// Imports
import axios from 'axios';

// Initial State
const initialState = {
  balance: 0,
};

// Actions Types
const DEPOSIT_FIFTY = 'DEPOSIT_FIFTY';
const DEPOSIT_HUNDRED = 'DEPOSIT_HUNDRED';
const DEPOSIT_CUSTOM_AMOUNT = 'DEPOSIT_CUSTOM_AMOUNT';
const WITHDRAW_FIFTY = 'WITHDRAW_FIFTY';
const WITHDRAW_HUNDRED = 'WITHDRAW_HUNDRED';
const WITHDRAW_CUSTOM_AMOUNT = 'WITHDRAW_CUSTOM_AMOUNT';
// Here is an additional Action Type to take care of currency conversions.
const CONVERT_CURRENCY = 'CONVERT_CURRENCY';

// Action Creators
export const depositFiftyActionCreator = () => ({
  type: DEPOSIT_FIFTY,
});

export const depositHundredActionCreator = () => ({
  type: DEPOSIT_HUNDRED,
});

export const depositCustomAmountActionCreator = customAmount => ({
  type: DEPOSIT_CUSTOM_AMOUNT,
  customAmount,
});

export const withdrawFiftyActionCreator = () => ({
  type: WITHDRAW_FIFTY,
});

export const withdrawHundredActionCreator = () => ({
  type: WITHDRAW_HUNDRED,
});

export const withdrawCustomAmountActionCreator = customAmount => ({
  type: WITHDRAW_CUSTOM_AMOUNT,
  customAmount,
});

export const convertCurrencyActionCreator = () => ({
  type: CONVERT_CURRENCY,
  // What will be the payload of this Action Creator?

  // Make sure you also declare a parameter to bring in said payload.
});

// Thunk Creators
export const convertCurrencyThunkCreator = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get(
        // cors-anywhere is a proxy wrapper around our third-party API calls that helps us avoid CORS errors.

        // Find a free third-party currency conversion API and use it in this axios.get call by adding it directly after the cors-anywhere URL.

        // I would recommend giving FreeForexAPI a try! (https://www.freeforexapi.com/Home/Api)

        // What would the API call require for you to get a conversion rate successfully?

        // Make sure you also declare parameters to bring in said requirements.

        `https://cors-anywhere.herokuapp.com/`
      );

      // What do we get back from the axios call as data?
      console.log({ data });

      // What do we need to do with that data to update the balance in the store?
      dispatch();
    } catch (error) {
      console.error(error);
    }
  };
};

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

    case DEPOSIT_CUSTOM_AMOUNT:
      return {
        ...state,
        balance: state.balance + action.customAmount,
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

    case WITHDRAW_CUSTOM_AMOUNT:
      return {
        ...state,
        balance: state.balance - action.customAmount,
      };

    case CONVERT_CURRENCY:
      return {
        ...state,
        // What will we do with the action payload to update the current balance?
      };

    default:
      return state;
  }
};

// Exports
export default bankReducer;
