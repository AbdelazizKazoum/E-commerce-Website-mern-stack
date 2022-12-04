import axios from "axios";
import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_REQUEST,
} from "../constants/productConstants";

export const listProducts = () => async (dispatch) => {
  dispatch({ type: PRODUCT_LIST_REQUEST });

  axios
    .get("api/products")
    .then((response) => {
      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: PRODUCT_LIST_FAIL,

        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    });
};
