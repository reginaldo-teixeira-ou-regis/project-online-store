import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';

class ItemDetails extends Component {
  state = {
    title: '',
    thumbnail: '',
    price: '',
    id: '',
  };

  componentDidMount() {
    this.handleItemsDetails();
  }

  // Chamada do resultado da API
  handleItemsDetails = async () => {
    const { match: { params: { id } } } = this.props;
    const responseAPI = await getProductById(id);
    const { title, thumbnail, price } = responseAPI;
    this.setState({
      title,
      thumbnail,
      price,
      id,
    });
  };

  saveProductLocalStorage = () => {
    const productSave = this.state;
    const productLocalStorage = JSON.parse(localStorage.getItem('cartItems'));
    if (productLocalStorage === null) {
      localStorage.setItem('cartItems', JSON.stringify([productSave]));
    } else {
      const productLocalStorageAdd = [...productLocalStorage, productSave];
      localStorage.setItem('cartItems', JSON.stringify(productLocalStorageAdd));
    }
  };

  render() {
    const { title, thumbnail, price, id } = this.state;
    return (
      <div key={ id }>
        <h2 data-testid="product-detail-name">
          { title }
        </h2>
        <img
          data-testid="product-detail-image"
          src={ thumbnail }
          alt={ title }
        />
        <span data-testid="product-detail-price">{ price }</span>
        <button
          data-testid="product-detail-add-to-cart"
          type="button"
          onClick={ this.saveProductLocalStorage }
        >
          Adicionar ao carrinho
        </button>
        <Link
          to="/shopping-cart"
          data-testid="shopping-cart-button"
        >
          Carrinho de Compras
        </Link>
      </div>
    );
  }
}

ItemDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default ItemDetails;
