// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { CURRENCIES_WALLET_TYPE, EXPENSES_WALLET_TYPE, LOADING } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  loading: false,
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case CURRENCIES_WALLET_TYPE:
    return {
      ...state,
      currencies: [action.value],
    };
  case EXPENSES_WALLET_TYPE:
    return {
      ...state,
      expenses: [...state.expenses,
        { ...action.othersStates, exchangeRates: action.returnAPI }],
    };
  case LOADING:
    return {
      ...state,
      loading: !state.loading,
    };
  default:
    return state;
  }
}

export default wallet;
