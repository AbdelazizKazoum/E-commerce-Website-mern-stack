import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRETEKEY, {
    expiresIn: "20d",
  });
};

export { generateToken };
