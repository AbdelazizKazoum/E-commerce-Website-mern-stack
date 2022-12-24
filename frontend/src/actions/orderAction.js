import axios from "axios";
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
} from "../constants/orderConstant";

const createOrder = (order, token) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post("/api/order", order, config);

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      success: true,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export { createOrder };
