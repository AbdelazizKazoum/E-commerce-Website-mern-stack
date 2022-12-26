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

const orderPay = asyncHandler(async (req, res, next) => {
  const orderId = req.params.id;

  const order = await Order.findById({ _id: ObjectId(orderId) });

  if (order) {
    order.paidAt = Date.now();
    order.isPaid = true;
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_adress: req.body.email_adress,
    };

    const updatedOrder = await order.save();

    res.status(200).json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("order not found !!");
  }
});

//get orders by user
const getOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});

export { createOrder, getOrderDetails, orderPay, getOrders };
