import { func } from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CartItemCard from '../Components/CartItemCard';

class ShoppingCart extends Component {
  state = {
    cartItems: [],
  };

  componentDidMount() {
    this.getLocalStorage();
  }

  getLocalStorage = () => {
    const cartItemRecovered = JSON.parse(localStorage.getItem('cartItems'));
    if (cartItemRecovered) {
      this.setState({
        cartItems: cartItemRecovered,
      });
    }
  };

  /* handleChangeInput = ({ target }) => {
    const { name, value } = target;
    const { cartItems } = this.state;
    const cart = cartItems.map((item) => {
      if (item.id === name) {
        item.quantity = value;
      }
      return item;
    });
    this.setState({
      cartItems: cart,
    });
    localStorage.cartItems = JSON.stringify(cart);
  }; */

  handleIncrease = ({ target: { name } }) => {
    const { props: { countCart }, state: { cartItems } } = this;
    const cart = cartItems.map((item) => {
      if (item.id === name && item.quantity < item.available_quantity) {
        item.quantity += 1;
      }
      return item;
    });
    this.setState({
      cartItems: cart,
    });
    localStorage.cartItems = JSON.stringify(cart);
    countCart();
  };

  handleDecrease = ({ target: { name } }) => {
    const { props: { countCart }, state: { cartItems } } = this;
    const cart = cartItems.map((item) => {
      if (item.id === name && item.quantity > 1) {
        item.quantity -= 1;
      }
      return item;
    });
    this.setState({
      cartItems: cart,
    });
    localStorage.cartItems = JSON.stringify(cart);
    countCart();
  };

  handleDelete = ({ target: { name } }) => {
    const { props: { countCart }, state: { cartItems } } = this;
    const cart = cartItems.filter((item) => item.id !== name);
    this.setState({
      cartItems: cart,
    });
    localStorage.cartItems = JSON.stringify(cart);
    countCart();
  };

  render() {
    const { handleIncrease, handleDecrease, handleDelete,
      state: { cartItems } } = this;
    return (
      <div>
        {
          !cartItems.length ? (
            <h1 data-testid="shopping-cart-empty-message">
              Seu carrinho está vazio
            </h1>)
            : (
              cartItems
                .map((item) => (
                  <CartItemCard
                    key={ item.id }
                    product={ item }
                    handleIncrease={ handleIncrease }
                    handleDecrease={ handleDecrease }
                    handleDelete={ handleDelete }
                  />
                ))
            )
        }
        <Link to="/checkout">
          <button
            disabled={ !cartItems.length }
            data-testid="checkout-products"
            type="button"
          >
            Finalizar pedido
          </button>
        </Link>
      </div>
    );
  }
}

ShoppingCart.propTypes = {
  countCart: func.isRequired,
};

export default ShoppingCart;
