import React from 'react';
import SignIn from './SignIn';
import CollapsibleTable from '../components/CollapsiableTable';
import { Container } from '@mui/material';
import AddATask from '../features/tasks/AddATask';
import { useSelector } from 'react-redux';
import { selectTasks } from '../features/tasks/tasksSlice';
function Home() {
  // const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  // if (isAuthenticated) {
  return (
    <Container maxWidth='lg'>
      <AddATask />
      <CollapsibleTable />
    </Container>
  );
  // }
  // return <SignIn />;
}

export default Home;
