import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logoWallet from '../images/logoWallet.png';

class Header extends React.Component {
  updateExpense = () => {
    const { totalExpense } = this.props;
    let valueExpense = 0;
    totalExpense.forEach((expense) => {
      const moeda = expense.currency;
      const multiplication = Number(expense.value)
        * Number(expense.exchangeRates[moeda].ask);
      valueExpense += multiplication;
    });
    return valueExpense.toFixed(2);
  }

  render() {
    const { emailLogin } = this.props;

    return (
      <header>
        <img src={ logoWallet } alt="Logo da Trybewallet" />
        <h5 data-testid="email-field">
          Email:
          { emailLogin }
        </h5>
        <section>
          <h5>Despesa Total: R$</h5>
          <span data-testid="total-field">{ this.updateExpense() }</span>
          <span data-testid="header-currency-field">BRL</span>
        </section>
      </header>
    );
  }
}

Header.propTypes = {
  emailLogin: PropTypes.string,
  totalExpense: PropTypes.string,
}.isRequired;

const mapStateToProps = ({ user, wallet }) => ({
  emailLogin: user.email,
  totalExpense: wallet.expenses,
});

export default connect(mapStateToProps)(Header);
