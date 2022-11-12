import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';

class ShoppingCart extends Component {
  state = {
    isEmpty: true,
    cartItems: [],
    totalItems: localStorage.totalItems
      ? JSON.parse(localStorage.totalItems)
      : 0,
  };

  componentDidMount() {
    this.getLocalStorage();
  }

  getLocalStorage = () => {
    const cartItemRecovered = JSON.parse(localStorage.getItem('cartItems'));
    if (cartItemRecovered) {
      this.setState({
        isEmpty: false,
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
    const { cartItems } = this.state;
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
  };

  handleDecrease = ({ target: { name } }) => {
    const { cartItems } = this.state;
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
  };

  handleDelete = ({ target: { name } }) => {
    const { cartItems } = this.state;
    const cart = cartItems.filter((item) => item.id !== name);
    this.setState({
      cartItems: cart,
    });
    localStorage.cartItems = JSON.stringify(cart);
  };

  render() {
    const { isEmpty, cartItems, totalItems } = this.state;
    return (
      <div>
        <Header // A pesquisa não funciona por não ter as funções e não ser uma pagina preparada para isso
          totalItems={ totalItems }
          // inputSearch={ inputSearch }
          // handleChange={ this.handleChange }
          // handleProductsExhibition={ this.handleProductsExhibition }
        />
        {
          isEmpty ? (
            <h1 data-testid="shopping-cart-empty-message">
              Seu carrinho está vazio
            </h1>)
            : (
              cartItems
                .map(({
                  title, price, id, thumbnail, quantity,
                  /* available_quantity: availableQuantity, */
                }) => (
                  <div key={ id }>
                    <Header // A pesquisa não funciona por não ter as funções e não ser uma pagina preparada para isso
                      totalItems={ totalItems }
                      // inputSearch={ inputSearch }
                      // handleChange={ this.handleChange }
                      // handleProductsExhibition={ this.handleProductsExhibition }
                    />
                    <h3 data-testid="shopping-cart-product-name">{title}</h3>
                    <img
                      src={ thumbnail }
                      alt={ title }
                    />
                    <p>{price}</p>
                    <button
                      name={ id }
                      type="button"
                      data-testid="remove-product"
                      onClick={ this.handleDelete }
                    >
                      x
                    </button>
                    <button
                      name={ id }
                      type="button"
                      data-testid="product-decrease-quantity"
                      onClick={ this.handleDecrease }
                      /* disabled={ quantity > 0 } */
                    >
                      -
                    </button>
                    {/* <input
                      type="number"
                      name={ id }
                      data-testid="shopping-cart-product-quantity"
                      min="1"
                      max={ availableQuantity }
                      value={ quantity }
                      onChange={ this.handleChangeInput }
                    /> */}
                    <span data-testid="shopping-cart-product-quantity">{quantity}</span>
                    <button
                      name={ id }
                      type="button"
                      data-testid="product-increase-quantity"
                      onClick={ this.handleIncrease }
                    >
                      +
                    </button>
                  </div>
                ))
            )
        }
        <Link to="/checkout">
          <button
            disabled={ isEmpty }
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

export default ShoppingCart;
