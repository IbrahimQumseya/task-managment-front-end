import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import ReactDOM from 'react-dom';
// We're using our own custom render function and not RTL's render.
// Our custom utils also re-export everything from RTL
// so we can import fireEvent and screen here as well
// import i18n from '../asserts/languages';
import { fireEvent, screen } from '../redux/test-userSlice-utils';
import { I18nextProvider } from 'react-i18next';
import SignUp from './SignUp';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { render } from '@testing-library/react';
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
let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  server.resetHandlers();
  container = null;
});

// Reset any runtime request handlers we may add during the tests.
// afterEach(() => {
//   jest.mock('react-i18next', () => ({
//     // this mock makes sure any components using the translate HoC receive the t function as a prop
//     withTranslation: () => (Component) => {
//       Component.defaultProps = { ...Component.defaultProps, t: () => '' };
//       return Component;
//     },
//   }));
// });

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

// // Disable API mocking after the tests are done.
// afterAll(() => server.close());
describe('sign in', () => {
  test('button to be Disabled without', async () => {
    render(<SignUp />);
    const signUpButton = screen.getByTestId('signUpButton');
    expect(signUpButton).toBeDisabled();
  });
  test('button to be enable without', async () => {
    await act(async () => {
      ReactDOM.render(<SignUp />, container);
    });
    const signUpButton = await screen.findByTestId('signUpButton');

    const firstName = screen.getByTestId('required-firstName');
    const passwordConform = screen.getByTestId('required-passwordConform');
    const password = screen.getByTestId('required-password');
    const email = screen.getByTestId('required-email');
    const username = screen.getByTestId('required-username');
    const lastName = screen.getByTestId('required-lastName');
    const acceptTerms = screen.getByTestId('required-acceptTerms');

    expect(firstName).toBeRequired();
    expect(passwordConform).toBeRequired();
    expect(password).toBeRequired();
    expect(email).toBeRequired();
    expect(username).toBeRequired();
    expect(lastName).toBeRequired();

    // userEvent.type(firstName, 'firstname');
    // userEvent.type(passwordConform, 'hanna121212!S');
    // userEvent.type(password, 'hanna121212!S');
    // userEvent.type(email, 'email@c.com');
    // userEvent.type(username, 'username');
    // userEvent.type(lastName, 'lastName');
    // userEvent.click(acceptTerms);

    // expect(password).toHaveValue('hanna121212!S');
    expect(signUpButton).toBeDisabled();

    // const { getByTestId } = render(<App />);
    // const appRouter = getByTestId('appRouter');
    // expect(appRouter).toBeTruthy();

    // expect(await screen.findByRole('button', { name: /Sign In/i })).toBeDisabled();
    // userEvent.type(screen.getByPlaceholderText(/username/i), 'firstname');
    // userEvent.type(screen.getByPlaceholderText(/password/i), 'SDOWSL@!21as');

    // expect(await screen.findByRole('button', { name: /Sign In/i })).toBeEnabled();
  });
});
