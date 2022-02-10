import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ExpenseTable extends React.Component {
  render() {
    const { walletData: { expenses } } = this.props;
    console.log(expenses);
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
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

ExpenseTable.propTypes = {
  walletData: PropTypes.func,
}.isRequired;

const mapStateToProps = ({ wallet }) => ({
  walletData: wallet,
});

export default connect(mapStateToProps)(ExpenseTable);
