import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { emailLoginAction } from '../actions';

const MIN_PASSWORD_LENGTH = 5;

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      buttonDisabled: true,
    };
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.type]: target.value,
    }, () => {
      const { email, password } = this.state;
      const checkEmail = email.includes('@') && email.includes('.com');
      const checkPassword = password.length > MIN_PASSWORD_LENGTH;
      this.setState({
        buttonDisabled: !(checkEmail && checkPassword), // se o resultado for true ele fica falso, por isso colocar o contrário lá na frente e coloquei o parênteses pra só acontecer a verificação no final.
      });
    });
  }

  handleClick = () => {
    const { email } = this.state;
    const { emailLogin, history } = this.props;
    emailLogin({ email });
    history.push('/carteira');
  }

  render() {
    const { buttonDisabled } = this.state;

    return (
      <form>
        <label htmlFor="email">
          <input
            type="email"
            id="email"
            placeholder="Email"
            data-testid="email-input"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="password">
          <input
            type="password"
            id="password"
            placeholder="Senha"
            data-testid="password-input"
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="submit"
          disabled={ buttonDisabled }
          onClick={ this.handleClick }
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  emailLogin: PropTypes.func,
  history: PropTypes.objectOf(PropTypes.any),
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  emailLogin: (email) => dispatch(emailLoginAction(email)),
});

export default connect(null, mapDispatchToProps)(Login);
