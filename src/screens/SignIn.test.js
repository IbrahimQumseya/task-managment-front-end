import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
// We're using our own custom render function and not RTL's render.
// Our custom utils also re-export everything from RTL
// so we can import fireEvent and screen here as well
// import i18n from '../asserts/languages';
import { render, fireEvent, screen } from '../redux/test-userSlice-utils';
import userEvent from '@testing-library/user-event';
import { I18nextProvider } from 'react-i18next';
import SignIn from './SignIn';
import '@testing-library/jest-dom';
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
  // i18n.init();

  server.listen();
});

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());
// afterEach(() => {
//   jest.mock('react-i18next', () => ({
//     // this mock makes sure any components using the translate HoC receive the t function as a prop
//     withTranslation: () => (Component) => {
//       Component.defaultProps = { ...Component.defaultProps, t: () => '' };
//       return Component;
//     },
//   }));
// });

jest.mock('react-i18next', () => ({
  useTranslation: () => ({t: key => key})
}));

// // Disable API mocking after the tests are done.
// afterAll(() => server.close());
describe('sign in', () => {
  test('button to be Disabled without', async () => {
    render(<SignIn />);
    const signinButton = screen.getByTestId('signinButton');
    expect(signinButton).toBeDisabled();

    // const { getByTestId } = render(<App />);
    // const appRouter = getByTestId('appRouter');
    // expect(appRouter).toBeTruthy();

    // expect(await screen.findByRole('button', { name: /Sign In/i })).toBeDisabled();
    // userEvent.type(screen.getByPlaceholderText(/username/i), 'firstname');
    // userEvent.type(screen.getByPlaceholderText(/password/i), 'SDOWSL@!21as');

    // expect(await screen.findByRole('button', { name: /Sign In/i })).toBeEnabled();

  });
});
