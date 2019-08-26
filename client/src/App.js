import React from 'react';
import AppNavbar from './components/header/AppNavBar';
import ShoppingList from './components/main/ShoppingList';

import { Provider } from 'react-redux';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <section className="App">
        <AppNavbar />
        <ShoppingList />
      </section>
    </Provider>
  );
}

export default App;
