import jwt from "jsonwebtoken";
import moment from "moment";
import { db } from "../connect.js";

export const getStories = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "strongpassword123", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");
    const q =
      "SELECT s.*, u.name FROM stories as s join users as u ON s.userid = u.id WHERE createdAt >= DATE_SUB(NOW(), INTERVAL 1 DAY) ORDER BY createdAt DESC";
    db.query(q, (err, data) => {
      if (err) throw err;
      return res.json(data);
    });
  });
};

export const addStory = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "strongpassword123", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");
    const { storyUrl } = req.body;
    const q = "INSERT INTO stories (`img`, `userid`, `createdAt`) VALUES (?)";
    const values = [
      storyUrl,
      userInfo.id,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    ];
    db.query(q, [values], (err, data) => {
      if (err) throw err;
      return res.json("Story added successfully");
    });
  });
};
