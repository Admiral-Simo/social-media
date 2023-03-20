import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getUser = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "strongpassword123", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");
    const { userId } = req.params;
    const q = "SELECT * FROM users WHERE id =?";

    db.query(q, [userId], (err, data) => {
      if (err) return res.status(500).json(error);
      if (data.length > 0) {
        const { password, ...info } = data[0];
        return res.status(200).json(info);
      }
    });
  });
};

export const updateUser = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  const { name, city, website, coverPic, profilePic } = req.body;

  console.log("name", name);
  console.log("city", city);
  console.log("website", website);
  console.log("coverPic", coverPic);
  console.log("profilePic", profilePic);

  jwt.verify(token, "strongpassword123", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");
    const q =
      "UPDATE users SET `name`=?, `city`=?, `website`=?, `profilePic`=?, `coverPic`=? WHERE id = ?";

    db.query(
      q,
      [name, city, website, profilePic, coverPic, userInfo.id],
      (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.affedctedRows > 0) return res.json("Updated!")
        return res.status(403).json("You can update only your profile")
      }
    );
  });
};
