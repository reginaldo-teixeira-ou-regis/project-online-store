import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {
  render() {
    const {
      totalItems,
      inputSearch,
      handleChange,
      handleProductsExhibition,
    } = this.props;
    return (
      <div>
        <Link to="/shopping-cart" data-testid="shopping-cart-button">
          Carrinho de Compra
          <p data-testid="shopping-cart-size">
            {totalItems}
          </p>
        </Link>
        <input
          data-testid="query-input"
          name="inputSearch"
          value={ inputSearch }
          type="text"
          onChange={ handleChange }
          placeholder="Digite aqui"
        />
        <button
          data-testid="query-button"
          type="button"
          onClick={ handleProductsExhibition }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

Header.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleProductsExhibition: PropTypes.func.isRequired,
  inputSearch: PropTypes.string.isRequired,
  totalItems: PropTypes.number.isRequired,
};
