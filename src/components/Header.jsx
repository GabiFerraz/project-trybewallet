import React from 'react';
import { connect } from 'react-redux';
import logoWallet from '../images/logoWallet.png';

class Header extends React.Component {
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
          <span data-testid="total-field">0</span>
          <span data-testid="header-currency-field">BRL</span>
        </section>
      </header>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  emailLogin: user.email,
});

export default connect(mapStateToProps)(Header);
