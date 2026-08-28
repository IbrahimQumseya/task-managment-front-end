import { ThemeProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';

import './asserts/languages/index';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import { store } from './redux/store';
import { appTheme } from './theme';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
