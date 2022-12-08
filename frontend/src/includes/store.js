import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";

import {
  productListReducer,
  productDetailsReducer,
} from "../reducers/productReducers";
import { cartReducer } from "../reducers/cartReducers";

import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
});

//------------ Call cart items from local storage -------------------
const cartItemsFromLocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const initialState = {
  cart: { cartItems: cartItemsFromLocalStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
