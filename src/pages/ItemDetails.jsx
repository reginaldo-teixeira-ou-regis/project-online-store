import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';

class ItemDetails extends Component {
  state = {
    title: '',
    thumbnail: '',
    price: '',
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
    });
  };

  render() {
    const { title, thumbnail, price } = this.state;
    return (
      <div>
        <h2 data-testid="product-detail-name">
          { title }
        </h2>
        <img
          data-testid="product-detail-image"
          src={ thumbnail }
          alt={ title }
        />
        <span data-testid="product-detail-price">{ price }</span>
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
