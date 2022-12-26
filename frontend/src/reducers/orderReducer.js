import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_RESET,
  ORDER_DETAILS_SUCCESS,
  ORDER_MY_FAIL,
  ORDER_MY_REQUEST,
  ORDER_MY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_RESET,
  ORDER_PAY_SUCCESS,
} from "../constants/orderConstant";

const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        loading: true,
      };
    case ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        createdOrder: action.payload,
      };
    case ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

const orderDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { loading: true };
    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };
    case ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_DETAILS_RESET:
      return { order: {} };

    default:
      return state;
  }
};

const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return { loading: true };
    case ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ORDER_PAY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_PAY_RESET:
      return {};

    default:
      return state;
  }
};

const userOrdersReducer = (
  state = { loadingOrders: true, orders: [] },
  action
) => {
  switch (action.type) {
    case ORDER_MY_REQUEST:
      return { loadingOrders: true };
    case ORDER_MY_SUCCESS:
      return {
        loadingOrders: false,
        orders: action.payload,
      };
    case ORDER_MY_FAIL:
      return {
        loadingOrders: false,
        errorOrders: action.payload,
      };
    case ORDER_PAY_RESET:
      return {
        orders: [],
      };

    default:
      return state;
  }
};

export {
  orderReducer,
  orderDetailsReducer,
  orderPayReducer,
  userOrdersReducer,
};
