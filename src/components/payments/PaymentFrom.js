import { CardElement } from '@stripe/react-stripe-js';
import usePaymentForm from './usePaymentFrom';
import React from 'react';

const PaymentFrom = () => {
  const { handleSubmit } = usePaymentForm();
  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button>Pay</button>
    </form>
  );
};

export default PaymentFrom;
