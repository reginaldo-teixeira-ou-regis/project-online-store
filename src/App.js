import React from 'react';

import { Route, Switch } from 'react-router-dom';
import ProductList from './pages/ProductList';
import ShoppingCart from './pages/ShoppingCart';
import ItemDetails from './pages/ItemDetails';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ ProductList } />
        <Route exact path="/shopping-cart" component={ ShoppingCart } />
        <Route exact path="/items/:id" component={ ItemDetails } />
      </Switch>
    </div>
  );
}

export default App;
