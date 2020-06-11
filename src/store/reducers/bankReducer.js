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

export const convertCurrencyActionCreator = conversionRate => ({
  type: CONVERT_CURRENCY,
  conversionRate,
});

// Thunk Creators
export const convertCurrencyThunkCreator = (sourceCurrency, targetCurrency) => {
  return async dispatch => {
    try {
      const { data } = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://www.freeforexapi.com/api/live?pairs=${sourceCurrency}${targetCurrency}`
      );

      const conversionRate = data.rates[sourceCurrency + targetCurrency].rate;

      dispatch(convertCurrencyActionCreator(conversionRate));
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
        balance: state.balance * action.conversionRate,
      };

    default:
      return state;
  }
};

// Exports
export default bankReducer;
