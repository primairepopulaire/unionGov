import { Component } from 'react';
import { Provider } from 'react-redux';
import Navigation from './navigation';
import { store } from './redux/store';
import { EmptyRecord } from './types';

class App extends Component<EmptyRecord, EmptyRecord> {
  render () {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}

export default App
