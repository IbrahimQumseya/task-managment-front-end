import React from 'react';
import SignIn from './SignIn';
import CollapsibleTable from '../components/CollapsiableTable';
import { Container } from '@mui/material';
import AddATask from '../features/tasks/AddATask';
import { useSelector } from 'react-redux';
import { selectTasks } from '../features/tasks/tasksSlice';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentFrom from '../components/payments/PaymentFrom'

function Home() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  if (isAuthenticated) {
    const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
    return (
      <Container maxWidth='lg'>
        <AddATask />
        <CollapsibleTable />
        <Elements stripe={stripePromise}>
          <PaymentFrom />
        </Elements>
      </Container>
    );
  }
  return <SignIn />;
}

export default Home;
