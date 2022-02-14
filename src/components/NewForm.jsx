import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEditNewFormAction, editStateNewFormAction } from '../actions';
import style from './FormsDespesa.module.css';

const LENGTH_MOEDAS = 3;

class NewForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currencies: [],
      methodPay: ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'],
      optionsTag: ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'],
      ...props.expenseEdit,
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
    const { value, description, currency, method, tag, id, exchangeRates } = this.state;
    const { expenseData, editNewForm } = this.props;
    expenseData({ value, description, currency, method, tag, id, exchangeRates });
    editNewForm();
  }

  render() {
    const { currencies,
      methodPay,
      optionsTag, value, description, currency, method, tag } = this.state;

    return (
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
          data-testid="edit-btn"
          onClick={ this.handleClick }
        >
          Editar despesa
        </button>
      </form>
    );
  }
}

NewForm.propTypes = {
  expenseData: PropTypes.func,
  expenseEdit: PropTypes.arrayOf({}),
  editNewForm: PropTypes.func,
}.isRequired;

const mapStateToProps = ({ wallet }) => ({
  expenseEdit: wallet.findEdit,
});

const mapDispatchToProps = (dispatch) => ({
  expenseData: (allDataExpense) => dispatch(addEditNewFormAction(allDataExpense)),
  editNewForm: () => dispatch(editStateNewFormAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewForm);
