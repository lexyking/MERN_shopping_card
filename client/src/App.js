import React, { Component } from 'react';
import {
  AppNavbar,
  ShoppingList,
  ItemModal
} from './components/index';

import { Container } from 'reactstrap';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {

    return (
      <Provider store={store}>
        <section className="App">
          <AppNavbar />
          <Container>
            <ItemModal />
            <ShoppingList />
          </Container>
        </section>
      </Provider>
    );
  }
}

export default App;
