import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { deleteExpensesWalletAction,
  editExpensesWalletAction, editStateNewFormAction } from '../actions';
import style from './ExpenseTable.module.css';

class ExpenseTable extends React.Component {
  render() {
    const { walletData: { expenses },
      deleteExpense, editExpense, editNewForm } = this.props;

    return (
      <table className={ style.table }>
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
                <td>{ exchangeRates[currency].name.split('/')[0] }</td>
                <td>{ Number(exchangeRates[currency].ask).toFixed(2) }</td>
                <td>{ (value * Number(exchangeRates[currency].ask)).toFixed(2) }</td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="edit-btn"
                    onClick={ () => {
                      editExpense(id);
                      editNewForm();
                    } }
                  >
                    Editar
                    {/* <FaEdit /> */}
                  </button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => deleteExpense(id) }
                  >
                    Excluir
                    {/* <FaTrashAlt /> */}
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
  editExpense: PropTypes.func,
  editNewForm: PropTypes.func,
}.isRequired;

// no mapState eu trago o retorno do meu reducer
const mapStateToProps = ({ wallet }) => ({
  walletData: wallet,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (id) => dispatch(deleteExpensesWalletAction(id)),
  editExpense: (id) => dispatch(editExpensesWalletAction(id)),
  editNewForm: () => dispatch(editStateNewFormAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseTable);
