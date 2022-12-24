import mongoose from "mongoose";
import connectDb from "./config/db.js";
import dotenv from "dotenv";
import users from "./data/userList.js";
import products from "./data/productsList.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";

dotenv.config();

connectDb();

const importData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    await Order.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((item) => {
      return { ...item, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log("data imported successfuly");
    process.exit();
  } catch (err) {
    console.log("failed !!! : " + err);
    process.exit(1);
  }
};

//Destroy all data
const destroyData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();

    await Order.deleteMany();

    console.log("successfuly destroyed");
    process.exit();
  } catch (err) {
    console.log("failed !!! : " + err);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
