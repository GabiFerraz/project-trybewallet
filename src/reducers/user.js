// Esse reducer será responsável por tratar as informações da pessoa usuária
// Importei o nome do meu type criado na minha action:
import { EMAIL_LOGIN_TYPE } from '../actions';

// Criei o meu estado inicial só com o meu email, pois é a informação que eu preciso salvar no estado global:
const INITIAL_STATE = {
  email: '',
};

// Criei a função do meu login, passando como parâmetro o meu state que vai receber o meu estado inicial e minha action. Aí no switch (que é tipo um if, ou seja, se for essa action me retorne as informações referentes a ela) passei como parâmetro o type da minha action, dentro dele o meu case com o nome do meu type, retornando o value da minha action. Depois passei o meu default (se a case não der certo, ele retorna o meu estado anterior) retornando o meu state.
function login(state = INITIAL_STATE, action) {
  switch (action.type) {
  case EMAIL_LOGIN_TYPE:
    return action.value;
  default:
    return state;
  }
}

export default login;
