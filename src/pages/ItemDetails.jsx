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
    message: '',
    email: '',
    rate: '',
    rateChecked: [{ id: 1, checked: false },
      { id: 2, checked: false },
      { id: 3, checked: false },
      { id: 4, checked: false },
      { id: 5, checked: false }],
    isInvalid: false,
    reviews: [],
    freeShipping: false,
  };

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const reviews = JSON.parse(localStorage.getItem(id));
    this.handleItemsDetails();
    if (reviews) {
      this.setState({
        reviews,
      });
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });

    if (target.type === 'radio') {
      this.setState(({ rateChecked }) => ({
        rateChecked: rateChecked.map((_bool, index) => (
          {
            id: index + 1,
            checked: (Number(target.id) === index + 1),
          }
        )),
      }));
    }
  };

  onClickSubmitButton = () => {
    const { email, rate, message } = this.state;
    const { match: { params: { id } } } = this.props;
    if (email.length <= 0 || rate.length <= 0 || !email.match(/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm)) {
      this.setState({
        isInvalid: true,
      });
    } else {
      this.setState(({ reviews }) => ({
        isInvalid: false,
        message: '',
        email: '',
        rateChecked: [{ id: 1, checked: false },
          { id: 2, checked: false },
          { id: 3, checked: false },
          { id: 4, checked: false },
          { id: 5, checked: false }],
        reviews: [...reviews, {
          email,
          rating: rate,
          text: message,
        }],
      }), () => {
        const { reviews } = this.state;
        localStorage.setItem(id, JSON.stringify(reviews));
      });
    }
  };

  // Chamada do resultado da API
  handleItemsDetails = async () => {
    const { match: { params: { id } } } = this.props;
    const responseAPI = await getProductById(id);
    const { title, thumbnail, price,
      shipping: { free_shipping: freeShipping } } = responseAPI;
    this.setState({
      title,
      thumbnail,
      price,
      id,
      freeShipping,
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
    const {
      handleChange,
      onClickSubmitButton,
      state: {
        title,
        thumbnail,
        price,
        email,
        message,
        isInvalid,
        rateChecked,
        reviews,
        id,
        freeShipping,
      } } = this;
    return (
      <div key={ id }>
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
          { freeShipping && <span>Frete grátis</span> }
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
        <div>
          <form>
            <input
              data-testid="product-detail-email"
              type="email"
              placeholder="Email"
              name="email"
              onChange={ handleChange }
              value={ email }
            />
            { rateChecked.map(({ checked }, index) => (
              <label key={ `${index + 1}-rating` } htmlFor={ index + 1 }>
                <input
                  data-testid={ `${index + 1}-rating` }
                  type="radio"
                  name="rate"
                  id={ index + 1 }
                  value={ index + 1 }
                  checked={ checked }
                  onChange={ handleChange }
                />
                { index + 1 }
              </label>
            )) }
            <textarea
              data-testid="product-detail-evaluation"
              placeholder="Mensagem (opcional)"
              onChange={ handleChange }
              name="message"
              value={ message }
            />
            <button
              data-testid="submit-review-btn"
              type="button"
              onClick={ onClickSubmitButton }
            >
              Avaliar
            </button>
            { isInvalid && <span data-testid="error-msg">Campos inválidos</span> }
          </form>
          <div>
            { reviews
              .map(({ email: emailReview, rating, text }, index) => (
                <div
                  key={ `review-${emailReview}-${index}` }
                >
                  <h4 data-testid="review-card-email">{ emailReview }</h4>
                  <span data-testid="review-card-rating">{ rating }</span>
                  <p data-testid="review-card-evaluation">{ text }</p>
                </div>
              )) }
          </div>
        </div>
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
