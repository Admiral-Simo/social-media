import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getRelationships = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "strongpassword123", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");
    const q = `SELECT followerUserId from relationships WHERE followedUserId = ?`;
    db.query(q, [req.query.followedUserId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data.map((relationship) => relationship.followerUserId));
    });
  });
};

export const toggleRelationship = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  const { userId } = req.body;

  jwt.verify(token, "strongpassword123", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const values = [userId, userInfo.id];

    const q = `SELECT * from relationships WHERE followedUserId = ? AND followerUserId = ?`;
    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length > 0) {
        const q = `DELETE from relationships WHERE followedUserId = ? AND followerUserId = ?`;
        db.query(q, values, (err, data) => {
          if (err) return res.status(500).json(err);
          return res.status(200).json("Follow deleted successfully");
        });
      } else {
        const q = "INSERT INTO relationships (`followedUserId`, `followerUserId`) VALUES (?, ?)";
        db.query(q, values, (err, data) => {
          if (err) throw err;
          return res.status(200).json("Follow Added successfully");
        });
      }
    });
  });
};
