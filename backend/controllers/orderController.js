import Order from "../models/orderModel.js";
import asyncHandler from "express-async-handler";

const createOrder = asyncHandler(async (req, res, next) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethode,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  console.log(req.body);
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
    return;
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod: paymentMethode,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

//get order details

const getOrderDetails = asyncHandler(async (req, res, next) => {
  const orderId = req.params.id;

  const order = await Order.findById({ _id: orderId }).populate(
    "user",
    " name email"
  );

  if (order || order._id == orderId) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("order not found !!");
  }
});

export { createOrder, getOrderDetails };
