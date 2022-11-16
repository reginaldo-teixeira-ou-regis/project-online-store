import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './Components/Header';
import Checkout from './pages/Checkout';
import ItemDetails from './pages/ItemDetails';
import ProductList from './pages/ProductList';
import ShoppingCart from './pages/ShoppingCart';
import { getProductsFromCategoryAndQuery } from './services/api';

export default class App extends Component {
  state = {
    totalItems: 0,
    category: '',
    inputSearch: '',
    isEmpty: true,
    products: [],
    isSearched: false,
  };

  componentDidMount() {
    this.countCartItems();
  }

  handleChange = ({ target }, callback = () => { }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, callback);
  };

  countCartItems = () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) ?? [];
    const totalItems = cartItems
      .reduce((total, { quantity }) => total + quantity, 0) ?? 0;

    this.setState({ totalItems });
    localStorage.totalItems = totalItems;
  };

  handleProductsExhibition = () => {
    const { inputSearch, category } = this.state;
    getProductsFromCategoryAndQuery(category, inputSearch)
      .then((data) => {
        this.setState({
          isEmpty: false,
          products: data.results,
          isSearched: true,
        });
      });
  };

  render() {
    const {
      handleChange,
      countCartItems,
      handleProductsExhibition,
      state: {
        totalItems,
        inputSearch,
        category,
        isEmpty,
        products,
        isSearched,
      } } = this;
    return (
      <div className="App">
        <Header
          totalItems={ totalItems }
          inputSearch={ inputSearch }
          handleChange={ handleChange }
          handleProductsExhibition={ handleProductsExhibition }
        />
        <Switch>
          <Route
            exact
            path="/"
            render={ (props) => (
              <ProductList
                { ...props }
                totalItems={ totalItems }
                countCart={ countCartItems }
                handleChange={ handleChange }
                category={ category }
                isEmpty={ isEmpty }
                products={ products }
                isSearched={ isSearched }
                handleProductsExhibition={ handleProductsExhibition }
              />) }
          />
          <Route
            exact
            path="/shopping-cart"
            render={ (props) => (
              <ShoppingCart
                { ...props }
                countCart={ countCartItems }
              />
            ) }
          />
          <Route
            exact
            path="/items/:id"
            render={ (props) => (
              <ItemDetails
                { ...props }
                totalItems={ totalItems }
                countCart={ countCartItems }
              />
            ) }
          />
          <Route
            exact
            path="/checkout"
            render={ (props) => (
              <Checkout
                { ...props }
              />
            ) }
          />
        </Switch>
      </div>
    );
  }
}
