// Esse reducer será responsável por tratar as informações da pessoa usuária
import { EMAIL_LOGIN_TYPE } from '../actions';

const INITIAL_STATE = {
  email: '',
};

function login(state = INITIAL_STATE, action) {
  switch (action.type) {
  case EMAIL_LOGIN_TYPE:
    return action.value;
  default:
    return state;
  }
}

export default login;
