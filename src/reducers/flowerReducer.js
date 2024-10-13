import {
  INCREMENT_QUANTITY,
  DECREMENT_QUANTITY,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SELECT_DATE,
  SET_CURRENCY,
  FETCH_CURRENCY_RATES,
  FETCH_FLOWERS,
  CHECKOUT_SUCCESS,
  CHECKOUT_FAILURE
} from '../actionTypes';

const initialState = {
  flowers: [],
  selectedDate: new Date().toISOString().slice(0, 10),
  currencyRates: { INR: 1 },
  selectedCurrency: 'INR',
  checkoutError: null
};

const flowerReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT_QUANTITY:
      return {
        ...state,
        flowers: state.flowers.map(flower =>
          flower.id === action.payload ? { ...flower, quantity: flower.quantity + 1 } : flower
        )
      };
      
    case DECREMENT_QUANTITY:
      return {
        ...state,
        flowers: state.flowers.map(flower =>
          flower.id === action.payload && flower.quantity > 0 ? { ...flower, quantity: flower.quantity - 1 } : flower
        )
      };

    case ADD_TO_CART:
      return {
        ...state,
        flowers: state.flowers.map(flower =>
          flower.id === action.payload ? { ...flower, inCart: true } : flower
        )
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        flowers: state.flowers.map(flower =>
          flower.id === action.payload ? { ...flower, inCart: false, quantity: 0 } : flower
        )
      };

    case SELECT_DATE:
      return {
        ...state,
        selectedDate: action.payload
      };

    case SET_CURRENCY:
      return {
        ...state,
        selectedCurrency: action.payload
      };

    case FETCH_CURRENCY_RATES:
      return {
        ...state,
        currencyRates: action.payload
      };

    case FETCH_FLOWERS:
      return {
        ...state,
        flowers: action.payload
      };

      case CHECKOUT_SUCCESS:
        return {
          ...state,
          cart: [],
          checkoutError: null
        };
      case CHECKOUT_FAILURE:
        return {
          ...state,
          checkoutError: action.payload
        };
      

    default:
      return state;
  }
};

export default flowerReducer;