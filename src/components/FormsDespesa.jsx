import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { expensesThunk } from '../actions';
import style from './FormsDespesa.module.css';
import NewForm from './NewForm';

// const LENGTH_MOEDAS = 3;

class FormsDespesa extends React.Component {
  constructor() {
    super();

    this.state = {
      currencies: ['USD',
        'CAD',
        'EUR',
        'GBP', 'ARS', 'BTC', 'LTC', 'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP'],
      methodPay: ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'],
      optionsTag: ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'],
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  componentDidMount() {
    this.fetchAPI();
  }

  fetchAPI = async () => {
    const request = await fetch('https://economia.awesomeapi.com.br/json/all');
    const requestJSON = await request.json();
    console.log(requestJSON);
    // const arrayCurrencies = Object.keys(requestJSON);
    // this.setState({
    //   currencies: arrayCurrencies.filter((moeda) => moeda.length === LENGTH_MOEDAS),
    // });
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  }

  handleClick = () => {
    const { value, description, currency, method, tag, id } = this.state;
    const { expenseData } = this.props;
    expenseData({ value, description, currency, method, tag, id });
    this.setState({
      value: '',
      description: '',
      id: id + 1,
    });
  }

  render() {
    const { currencies,
      methodPay,
      optionsTag, value, description, currency, method, tag } = this.state;

    const { editNewForm } = this.props;

    return (
      <section>
        { editNewForm
          ? <NewForm />
          : (
            <form className={ style.formsDespesa }>
              <label htmlFor="input-value">
                Valor:
                <input
                  type="text"
                  id="input-value"
                  data-testid="value-input"
                  name="value"
                  value={ value }
                  onChange={ this.handleChange }
                />
              </label>
              <label htmlFor="input-coin">
                Moeda:
                <select
                  id="input-coin"
                  data-testid="currency-input"
                  name="currency"
                  value={ currency }
                  onChange={ this.handleChange }
                >
                  { currencies.map((moeda) => (
                    <option data-testid={ moeda } key={ moeda }>{ moeda }</option>
                  )) }
                </select>
              </label>
              <label htmlFor="input-pay">
                Método de pagamento:
                <select
                  id="input-pay"
                  data-testid="method-input"
                  name="method"
                  value={ method }
                  onChange={ this.handleChange }
                >
                  { methodPay.map((pay) => (
                    <option key={ pay }>{ pay }</option>
                  )) }
                </select>
              </label>
              <label htmlFor="input-tag">
                Tag:
                <select
                  id="input-tag"
                  data-testid="tag-input"
                  name="tag"
                  value={ tag }
                  onChange={ this.handleChange }
                >
                  { optionsTag.map((option) => (
                    <option key={ option }>{ option }</option>
                  )) }
                </select>
              </label>
              <label htmlFor="input-description">
                Descrição:
                <input
                  type="text"
                  id="input-description"
                  data-testid="description-input"
                  name="description"
                  value={ description }
                  onChange={ this.handleChange }
                />
              </label>
              <button
                type="button"
                onClick={ this.handleClick }
              >
                Adicionar despesa
              </button>
            </form>
          )}
      </section>
    );
  }
}

FormsDespesa.propTypes = {
  expenseData: PropTypes.func,
  editNewForm: PropTypes.bool,
}.isRequired;

const mapStateToProps = ({ wallet }) => ({
  editNewForm: wallet.newForm,
});

const mapDispatchToProps = (dispatch) => ({
  expenseData: (expense) => dispatch(expensesThunk(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormsDespesa);
