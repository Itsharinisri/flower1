//import axios from 'axios';
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

export const incrementQuantity = (flowerId) => ({
  type: INCREMENT_QUANTITY,
  payload: flowerId
});

export const decrementQuantity = (flowerId) => ({
  type: DECREMENT_QUANTITY,
  payload: flowerId
});

export const addToCart = (flowerId) => ({
  type: ADD_TO_CART,
  payload: flowerId
});

export const removeFromCart = (flowerId) => ({
  type: REMOVE_FROM_CART,
  payload: flowerId
});

export const selectDate = (date) => ({
  type: SELECT_DATE,
  payload: date
});

export const setSelectedCurrency = (currency) => ({
  type: SET_CURRENCY,
  payload: currency
});

export const fetchCurrencyConversion = () => {
  return (dispatch) => {
    fetch('https://api.exchangerate-api.com/v4/latest/INR')
      .then(response => response.json())
      .then(data => {
        dispatch({
          type: FETCH_CURRENCY_RATES,
          payload: data.rates
        });
      })
      .catch(error => {
        console.error('Error fetching currency data:', error);
      });
  };
};

export const fetchFlowers = () => {
  return async (dispatch) => {
    try {
      const flowersData = [
        { id: 1, name: 'Rose', price: 10, quantity: 0, inCart: false, image: 'rose.jpg' },
        { id: 2, name: 'Garland', price: 15, quantity: 0, inCart: false, image: 'white_petal_garland1.jpg' },
        { id: 3, name: 'Chrysanthemum', price: 20, quantity: 0, inCart: false, image: 'white_chrys.jpg' },
        { id: 4, name: 'Lotus', price: 25, quantity: 0, inCart: false, image: 'lotus.jpg' }
      ];
      dispatch({
        type: FETCH_FLOWERS,
        payload: flowersData,
      });
    } catch (error) {
      console.error('Error fetching flowers:', error);
    }
  };
};

export const checkoutSuccess = () => ({
  type: CHECKOUT_SUCCESS
});

export const checkoutFailure = (error) => ({
  type: CHECKOUT_FAILURE,
  payload: error
});