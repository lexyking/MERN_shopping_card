import React from 'react';
import AppNavbar from './components/header/AppNavBar';
import ShoppingList from './components/main/ShoppingList';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <section className="App">
      <AppNavbar />
      <ShoppingList />
    </section>
  );
}

export default App;
