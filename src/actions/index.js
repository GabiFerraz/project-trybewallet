// Coloque aqui suas actions
export const EMAIL_LOGIN_TYPE = 'EMAIL-LOGIN';
export const CURRENCIES_WALLET_TYPE = 'CURRENCIES_WALLET';
export const EXPENSES_WALLET_TYPE = 'EXPENSES_WALLET';
export const LOADING = 'CARREGANDO';

export const emailLoginAction = (value) => ({
  type: EMAIL_LOGIN_TYPE,
  value,
});
export const currenciesWalletAction = (value) => ({
  type: CURRENCIES_WALLET_TYPE,
  value,
});
export const expensesWalletAction = (returnAPI, othersStates) => ({
  type: EXPENSES_WALLET_TYPE,
  returnAPI,
  othersStates,
});
const loading = () => ({
  type: LOADING,
});

export const currenciesThunk = (othersStates) => async (dispatch) => {
  try {
    dispatch(loading());
    const request = await fetch('https://economia.awesomeapi.com.br/json/all');
    const requestJSON = await request.json();
    dispatch(loading());
    dispatch(expensesWalletAction(requestJSON, othersStates));
  } catch (error) {
    console.error(error.message);
  }
};
