import React from 'react';
import Header from '../components/Header';
import FormsDespesa from '../components/FormsDespesa';
import ExpenseTable from '../components/ExpenseTable';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <FormsDespesa />
        <ExpenseTable />
      </>
    );
  }
}

export default Wallet;
