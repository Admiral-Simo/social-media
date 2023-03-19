import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getLikes = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "strongpassword123", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");
    const q = `SELECT userId from likes WHERE postId = ?`;
    db.query(q, [req.query.postId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data.map((like) => like.userId));
    });
  });
};

export const toggleLike = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  const { postId } = req.body;

  jwt.verify(token, "strongpassword123", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const values = [postId, userInfo.id];

    const q = `SELECT * from likes WHERE postId = ? AND userId = ?`;
    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length > 0) {
        const q = `DELETE from likes WHERE postId = ? AND userId = ?`;
        db.query(q, values, (err, data) => {
          if (err) return res.status(500).json(err);
          return res.status(200).json("Like deleted successfully");
        });
      } else {
        const q = "INSERT INTO likes (`postid`, `userid`) VALUES (?, ?)";
        db.query(q, values, (err, data) => {
          if (err) throw err;
          return res.status(200).json("Like Added successfully");
        });
      }
    });
  });
};
