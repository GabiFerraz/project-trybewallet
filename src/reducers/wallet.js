// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
// Importei o nome do meu type criado na minha action:
import { CURRENCIES_WALLET_TYPE,
  EXPENSES_WALLET_TYPE,
  LOADING,
  DELETE_EXPENSES_TYPE,
  EDIT_EXPENSES_TYPE, EDIT_STATE_NEW_FORM, ADD_EDIT_NEW_FORM } from '../actions';

// Criei o meu estado inicial conforme pedido no readme com o currencies e o expenses como arrays vazios, pois são as informações que eu preciso salvar no estado global, e depois adicionei o loading que fiz na action e usei no thunk iniciando como falso:
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  loading: false,
  newForm: false,
  findEdit: {},
};

// Criei a função da minha wallet, passando como parâmetro o meu state que vai receber o meu estado inicial e minha action. Aí no meu primeiro switch (que é tipo um if, ou seja, se for esse action.type me retorne as informações referentes a ela, nesse caso ele é genérico) passei como parâmetro o type da minha action, dentro dele o meu case com o nome do meu type (currencies) para a verificação do switch, se for esse type do currencies, retorna o value dessa minha action. Depois fiz o segundo case referente ao expenses, aí o terceiro case referente ao loading, e por último passei o meu default (se nenhuma das cases derem certo, ele retorna o meu estado anterior) retornando o meu state.
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
  case DELETE_EXPENSES_TYPE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.id),
    };
  case EDIT_EXPENSES_TYPE:
    return {
      ...state,
      findEdit: state.expenses.find((expense) => expense.id === action.id),
    };
  case EDIT_STATE_NEW_FORM:
    return {
      ...state,
      newForm: !state.newForm,
    };
  case ADD_EDIT_NEW_FORM:
    return {
      ...state,
      expenses: state.expenses.map((expense) => {
        if (expense.id === action.allDataExpense.id) {
          return action.allDataExpense;
        } return expense;
      }),
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
