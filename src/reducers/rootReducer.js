import { combineReducers } from 'redux';
import flowerReducer from './flowerReducer';

const rootReducer = combineReducers({
  flowerShop: flowerReducer,
  // Add other reducers here if you have any
});

export default rootReducer;