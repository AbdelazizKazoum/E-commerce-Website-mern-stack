import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import bcrypt from "bcryptjs";
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
userSchema.plugin(uniqueValidator);

// userSchema.pre("save", async (next) => {
//   // if (!this.isModified("password")) {
//   //   next();
//   // }

//   const salt = await bcrypt.genSalt(12);
//   this.password = await bcrypt.hash(this.password, salt);
// });

const User = mongoose.model("User", userSchema);

export default User;
