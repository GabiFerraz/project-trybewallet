import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logoWallet from '../images/logoWallet.png';
import style from './Header.module.css';

class Header extends React.Component {
  updateExpense = () => {
    const { totalExpense } = this.props;
    let valueExpense = 0;
    totalExpense.forEach((expense) => {
      const multiplication = Number(expense.value)
        * Number(expense.exchangeRates[expense.currency].ask);
      valueExpense += multiplication;
    });
    return valueExpense.toFixed(2);
  }

  render() {
    const { emailLogin } = this.props;

    return (
      <header className={ style.header }>
        <img src={ logoWallet } alt="Logo da Trybewallet" />
        <section className={ style.dadSection }>
          <h5 data-testid="email-field">
            Email:
            {' '}
            { emailLogin }
          </h5>
          <section className={ style.expenseSection }>
            <h5>Despesa Total: R$</h5>
            <h5 data-testid="total-field">{ this.updateExpense() }</h5>
            <h5 data-testid="header-currency-field">BRL</h5>
          </section>
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
