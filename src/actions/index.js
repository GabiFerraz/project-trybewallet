// Coloque aqui suas actions
// Por convenção, salvei o nome dos types nas variáveis:
export const EMAIL_LOGIN_TYPE = 'EMAIL-LOGIN';
export const CURRENCIES_WALLET_TYPE = 'CURRENCIES_WALLET';
export const EXPENSES_WALLET_TYPE = 'EXPENSES_WALLET';
export const LOADING = 'CARREGANDO';
export const DELETE_EXPENSES_TYPE = 'DELETE_EXPENSES';
export const EDIT_EXPENSES_TYPE = 'EDIT_EXPENSES';
export const EDIT_STATE_NEW_FORM = 'EDIT_NEW_FORM';
export const ADD_EDIT_NEW_FORM = 'ADD_EDIT_NEW_FORM';

// Action do email do login, é uma função, que no parâmetro está recebendo o valor que vai ser recebido na página, retornando o type sendo a variável que salvei e o valor.:
export const emailLoginAction = (value) => ({
  type: EMAIL_LOGIN_TYPE,
  value,
});

// Action das moedas:
export const currenciesWalletAction = (value) => ({
  type: CURRENCIES_WALLET_TYPE,
  value,
});

// Action dos valores gastos, onde recebo o retorno da API e os outros estados como parâmetro, e vou usar no dispatch do Thunk, para poder enviar para o estado global as informações que eu quero:
export const expensesWalletAction = (returnAPI, othersStates) => ({
  type: EXPENSES_WALLET_TYPE,
  returnAPI,
  othersStates,
});

export const deleteExpensesWalletAction = (id) => ({
  type: DELETE_EXPENSES_TYPE,
  id,
});

export const editExpensesWalletAction = (id) => ({
  type: EDIT_EXPENSES_TYPE,
  id,
});

export const editStateNewFormAction = () => ({
  type: EDIT_STATE_NEW_FORM,
});

export const addEditNewFormAction = (allDataExpense) => ({
  type: ADD_EDIT_NEW_FORM,
  allDataExpense,
});

// Action que vou usar para o dispatch do Thunk, relacionado ao Carregando que vai aparecer ou não na tela nos momentos que me interesse:
const loading = () => ({
  type: LOADING,
});

// Thunk feito para a requisição da API, uma função que retorna outra função, onde recebo no primeiro parâmetro os meus outros estados que vou usar como parâmetro da minha action de despesas que vai estar dentro do dispatch para mandar para o estado global, e como parâmetro da segunda função eu recebo o dispatch. Antes dele coloco o async, pois essa função está fazendo a requisição de uma API e precisa ser assíncrona. Coloquei dentro o try catch para a tentativa e erro. Dentro do try eu chamei o meu dispatch recebendo a minha action loading para exibir na tela o carregando, depois eu salvei o fetch da requisição da minha api em uma variável, depois salvei em outra variável o json dessa requisição, ou seja, o meu retorno. Aí fiz outro dispatch da minha loading para parar de exibir o carregando na tela, já que eu já tenho o retorno da minha api. Depois eu fiz o dispatch da action das minhas despesas recebendo como parâmetro o retorno da minha api e meus outros estados. E no meu catch eu fiz exibir a mensagem de erro caso a requisição não dê certo.
export const expensesThunk = (othersStates) => async (dispatch) => {
  try {
    dispatch(loading());
    const request = await fetch('https://economia.awesomeapi.com.br/json/all');
    const requestJSON = await request.json();
    delete requestJSON.USDT;
    delete requestJSON.DOGE;
    dispatch(loading());
    dispatch(expensesWalletAction(requestJSON, othersStates));
  } catch (error) {
    console.error(error.message);
  }
};
