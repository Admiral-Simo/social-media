import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../connect.js";

const register = (req, res) => {
  const { username, email, password, name } = req.body;
  // CHECK USER IF EXISTS

  const q = "SELECT * FROM users WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists!");
    // CREATE A NEW USER
    // HASH THE PASSWORD
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const q =
      "INSERT INTO users (`username`, `email`, `password`, `name`) VALUE (?)";

    const values = [username, email, hashedPassword, name];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User has been created.");
    });
  });
};
const login = (req, res) => {
  const { username, password } = req.body;
  const q = "SELECT * FROM users WHERE username = ?";
  db.query(q, [username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found.");

    const checkPassword = bcrypt.compareSync(password, data[0].password);

    if (!checkPassword) return res.status(400).json("Wrong password.");

    const token = jwt.sign({ id: data[0].id }, "strongpassword123");

    const { password: incomingPassword, ...others } = data[0];

    res
      .cookie("acessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  });
};
const logout = (req, res) => {
  res
    .clearCookie("acessToken", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json("User has been logged out.");
};

export { register, login, logout };
