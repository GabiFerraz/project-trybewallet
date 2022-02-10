import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(thunk),
));

export default store;

// Importei o necessário, depois criei minha store passando o rootReducer e a minha extensão do devtools e dentro do parâmetro dele eu passei a minha applyMiddleware para poder passar como parâmetro o meu thunk, já que eu iria precisar fazer um na minha action.
