import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";
import axios from "axios";
import { useStore } from "react-redux";

export const addToCart = (id, qte) => async (dispatch, useStore) => {
  axios
    .get(`/api/products/${id}`)
    .then((response) => {
      dispatch({
        type: CART_ADD_ITEM,
        payload: {
          product: response.data._id,
          name: response.data.name,
          image: response.data.image,
          price: response.data.price,
          countInStock: response.data.countInsStock,
          qte,
        },
      });

      localStorage.setItem(
        "cartItems",
        JSON.stringify(useStore().cart.cartItems)
      );
    })
    .catch((error) => {
      console.log(error);
    });
};

export const removeFromCart = (id) => async (dispatch,useStore) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });
   localStorage.setItem("cartItems", JSON.stringify(useStore().cart.cartItems));
};
