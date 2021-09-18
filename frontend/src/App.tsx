import { ThemeProvider } from '@material-ui/core';
import { Component } from 'react';
import { Provider } from 'react-redux';
import Navigation from './navigation';
import { store } from './redux/store';
import theme from './theme';
import { EmptyRecord } from './types';

import * as dotenv from 'dotenv';

dotenv.config();

class App extends Component<EmptyRecord, EmptyRecord> {
  render () {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
        <Navigation />
        </ThemeProvider>
      </Provider>
    );
  }
}

export default App
