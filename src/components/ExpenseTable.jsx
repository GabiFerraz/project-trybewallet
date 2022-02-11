import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpensesWalletAction } from '../actions';

class ExpenseTable extends React.Component {
  render() {
    const { walletData: { expenses }, deleteExpense } = this.props;

    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { expenses.map((expense) => {
            const { id,
              description, tag, method, value, currency, exchangeRates } = expense;
            return (
              <tr key={ id }>
                <td>{ description }</td>
                <td>{ tag }</td>
                <td>{ method }</td>
                <td>{ Number(value).toFixed(2) }</td>
                <td>{ exchangeRates[currency].name }</td>
                <td>{ Number(exchangeRates[currency].ask).toFixed(2) }</td>
                <td>{ (value * Number(exchangeRates[currency].ask)).toFixed(2) }</td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => deleteExpense(id) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

ExpenseTable.propTypes = {
  walletData: PropTypes.object,
  deleteExpense: PropTypes.func,
}.isRequired;

// no mapState eu trago o retorno do meu reducer
const mapStateToProps = ({ wallet }) => ({
  walletData: wallet,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (id) => dispatch(deleteExpensesWalletAction(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseTable);
