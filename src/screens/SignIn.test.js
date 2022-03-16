import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
// We're using our own custom render function and not RTL's render.
// Our custom utils also re-export everything from RTL
// so we can import fireEvent and screen here as well
import i18n from '../asserts/languages';
import { render, fireEvent, screen } from '../redux/test-userSlice-utils';
import userEvent from '@testing-library/user-event';
import { I18nextProvider } from 'react-i18next';
import SignIn from './SignIn';

// We use msw to intercept the network request during the test,
// and return the response 'John Smith' after 150ms
// when receiving a get request to the `/api/user` endpoint
export const handlers = [
  rest.get('/api/user', (req, res, ctx) => {
    return res(ctx.json('John Smith'), ctx.delay(150));
  }),
];

const server = setupServer(...handlers);

// Enable API mocking before tests.
beforeAll(() => {
  i18n.init();

  server.listen();
});

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());
afterEach(() => {
  jest.mock('react-i18next', () => ({
    // this mock makes sure any components using the translate HoC receive the t function as a prop
    withTranslation: () => (Component) => {
      Component.defaultProps = { ...Component.defaultProps, t: () => '' };
      return Component;
    },
  }));
});

// // Disable API mocking after the tests are done.
// afterAll(() => server.close());

test('button to be Disabled without', async () => {
  render(<SignIn />);
  userEvent.type(screen.getByPlaceholderText(/username/i), 'firstname');
  userEvent.type(screen.getByPlaceholderText(/password/i), 'SDOWSL@!21as');

  expect(await screen.findByRole('button', { name: /Sign In/i })).toBeEnabled();

  // should show no user initially, and not be fetching a user
  // expect(screen.getByText(/no user/i)).toBeInTheDocument();
  // expect(screen.queryByText(/Fetching user\.\.\./i)).not.toBeInTheDocument();

  // // after clicking the 'Fetch user' button, it should now show that it is fetching the user
  // fireEvent.click(screen.getByRole('button', { name: /Fetch user/i }));
  // expect(screen.getByText(/no user/i)).toBeInTheDocument();

  // // after some time, the user should be received
  // expect(await screen.findByText(/John Smith/i)).toBeInTheDocument();
  // expect(screen.queryByText(/no user/i)).not.toBeInTheDocument();
  // expect(screen.queryByText(/Fetching user\.\.\./i)).not.toBeInTheDocument();
});
