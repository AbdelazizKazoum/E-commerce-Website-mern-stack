import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const connection = await mongoose.connect(process.env.DB_CONNECTION, {});
    console.log(
      "database connected successfuly at " + connection.connection.host
    );
  } catch (err) {
   return console.log(err);
  }
};

export default connectDb;
