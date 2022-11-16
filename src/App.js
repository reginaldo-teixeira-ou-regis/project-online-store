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
    cartItems: [],
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

  getCartItems = () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems'));
    this.setState({
      cartItems: cartItems ?? [],
    });
  };

  countCartItems = () => {
    this.getCartItems();
    setTimeout(() => {
      const { cartItems } = this.state;
      const totalItems = cartItems
        .reduce((total, { quantity }) => total + quantity, 0) ?? 0;

      this.setState({ totalItems });
      localStorage.totalItems = totalItems;
    }, 100);
  };

  handleProductsExhibition = async () => {
    const { inputSearch, category } = this.state;
    console.log('Categoria:', category);
    console.log('InputSearch:', inputSearch);
    const responseAPI = await getProductsFromCategoryAndQuery(category, inputSearch);
    this.setState({
      isEmpty: false,
      products: responseAPI.results,
      isSearched: true,
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
              />) }
          />
          <Route exact path="/shopping-cart" component={ ShoppingCart } />
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
          <Route exact path="/checkout" component={ Checkout } />
        </Switch>
      </div>
    );
  }
}
