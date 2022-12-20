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
import {
  loginReducer,
  registerReducer,
  userDetailsReduser,
  updateUserReducer,
} from "../reducers/userReducers";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: loginReducer,
  userRegister: registerReducer,
  userDetails: userDetailsReduser,
  userUpdate: updateUserReducer,
});

//------------ Call cart items from local storage -------------------
const cartItemsFromLocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
//Call the shipping adress
const shippingAdressFromLocalStorage = localStorage.getItem("shippingAdress")
  ? JSON.parse(localStorage.getItem("shippingAdress"))
  : [];

//------------ Call User info from local storage -------------------
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

//------------ Call payment Methode from local storage -------------------
const paymentMethodeFromLocalStorage = localStorage.getItem("paymentMethode")
  ? JSON.parse(localStorage.getItem("paymentMethode"))
  : null;


const initialState = {
  cart: {
    cartItems: cartItemsFromLocalStorage,
    shipping: shippingAdressFromLocalStorage,
    paymentMethode: paymentMethodeFromLocalStorage,
  },
  userLogin: { userInfo: userInfoFromLocalStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
