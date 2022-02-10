import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { currenciesThunk } from '../actions';

const LENGTH_MOEDAS = 3;

class FormsDespesa extends React.Component {
  constructor() {
    super();

    this.state = {
      currencies: [],
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
    const arrayCurrencies = Object.keys(requestJSON);
    this.setState({
      currencies: arrayCurrencies.filter((moeda) => moeda.length === LENGTH_MOEDAS),
    });
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
    const { currencies, value, description, currency, method, tag } = this.state;

    return (
      <form>
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
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
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
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
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
    );
  }
}

FormsDespesa.propTypes = {
  expenseData: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  expenseData: (expense) => dispatch(currenciesThunk(expense)),
});

export default connect(null, mapDispatchToProps)(FormsDespesa);
