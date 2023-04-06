import jwt from "jsonwebtoken";
import { db } from "../connect.js";

export const getMessages = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  const { receiverid } = req.params;

  jwt.verify(token, "strongpassword123", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");
    const q = `SELECT m.id,senderid, u.id as userid, receiverid,msg, createdAt,name,profilePic
    FROM messages as m
    JOIN users as u ON m.senderid = u.id
    WHERE senderid = ? AND receiverid = ?;`;
    db.query(q, [userInfo.id, receiverid], (err, data) => {
      if (err) throw err;
      return res.json(data);
    });
  });
};
