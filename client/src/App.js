import React, { Component } from 'react';
import AppNavbar from './components/header/AppNavBar';
import ShoppingList from './components/main/ShoppingList';
import ItemModal from './components/itemModal';
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
