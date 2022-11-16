import React, { Component } from 'react';
import { func, shape, string } from 'prop-types';
import { getProductById } from '../services/api';
import DetailsReview from '../Components/DetailsReview';

class ItemDetails extends Component {
  state = {
    id: '',
    message: '',
    email: '',
    rate: '',
    product: {},
    rateChecked: [{ id: 1, checked: false },
      { id: 2, checked: false },
      { id: 3, checked: false },
      { id: 4, checked: false },
      { id: 5, checked: false }],
    isInvalid: false,
    reviews: [],
    cartItems: localStorage.cartItems
      ? JSON.parse(localStorage.cartItems)
      : [],
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

  // Chamada do resultado da API
  handleItemsDetails = async () => {
    const { match: { params: { id } } } = this.props;
    const responseAPI = await getProductById(id);
    this.setState({
      product: responseAPI,
    });
  };

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

  saveProductLocalStorage = () => {
    const { product, cartItems } = this.state;
    const { countCart } = this.props;
    const hadItem = cartItems.some((item) => item.id === product.id);
    if (!hadItem) {
      product.quantity = 1;
      cartItems.push(product);
      localStorage.cartItems = JSON.stringify(cartItems);
      this.setState({ cartItems });
    } else {
      cartItems.forEach((item) => {
        if (item.id === product.id && item.quantity < item.available_quantity) {
          item.quantity += 1;
        }
      });
      localStorage.cartItems = JSON.stringify(cartItems);
      this.setState({ cartItems });
    }
    countCart();
  };

  render() {
    const {
      handleChange,
      onClickSubmitButton,
      state: {
        product: {
          title,
          thumbnail,
          price,
          freeShipping,
        },
        email,
        message,
        isInvalid,
        rateChecked,
        reviews,
        id,
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

        </div>
        <div>
          <DetailsReview
            handleChange={ handleChange }
            onClickSubmitButton={ onClickSubmitButton }
            email={ email }
            message={ message }
            isInvalid={ isInvalid }
            rateChecked={ rateChecked }
          />
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
  match: shape({
    params: shape({
      id: string,
    }),
  }).isRequired,
  countCart: func.isRequired,
};

export default ItemDetails;
