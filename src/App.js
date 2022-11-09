import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ProductList from './pages/ProductList';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" component={ ProductList } />
      </Switch>
    </div>
  );
}

export default App;
