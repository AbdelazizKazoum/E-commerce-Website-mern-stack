import bcrypt from "bcryptjs";
const users = [
  {
    name: "Amdvfevin User",
    email: "admin1@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "AAdvin User",
    email: "admin2@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "AAdmdfvin User",
    email: "admin3@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "AAddcn User",
    email: "admin4@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
