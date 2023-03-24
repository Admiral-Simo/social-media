import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getComments = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "strongpassword123", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");
    const q = `SELECT c.*, u.id AS userId, name, profilePic FROM comments AS c JOIN users AS u ON (u.id = c.userId) WHERE c.postId = ? ORDER BY c.createdAt DESC;`;
    db.query(q, [req.query.postId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};

export const getCommenters = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  const { postId } = req.query;

  console.log(postId);

  jwt.verify(token, "strongpassword123", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");
    const q = `SELECT userid FROM comments WHERE postid = ?`;
    db.query(q, [postId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data.map((comment) => comment.userid));
    });
  });
};

export const addComment = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  const { desc, postId } = req.body;

  jwt.verify(token, "strongpassword123", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");
    const q =
      "INSERT INTO comments (`desc`, `createdAt`, `userId`, `postId` ) VALUES (?)";
    const values = [
      desc,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id,
      postId,
    ];
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Comment has been created");
    });
  });
};

export const deleteComment = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  const { id } = req.body;

  jwt.verify(token, "strongpassword123", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");
    const q = "DELETE FROM comments WHERE id = ? AND userid = ?";
    const values = [id, userInfo.id];
    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Comment has been deleted");
    });
  });
};

export const updateComment = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  const { desc, id } = req.body;

  jwt.verify(token, "strongpassword123", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");
    const q = "UPDATE comments SET `desc` = ? WHERE id = ? AND userid = ?";
    const q2 =
      "UPDATE comments SET isEdited = isEdited + 1 WHERE id = ? AND userid = ?";
    const values = [desc, id, userInfo.id];
    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Comment has been updated successfully");
    });
    db.query(q2, [id, userInfo.id], (err, data) => {
      if (err) throw err;
    });
  });
};

export const editedCount = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  const { id } = req.params;

  jwt.verify(token, "strongpassword123", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");
    const q = "SELECT isEdited FROM comments WHERE id = ?";

    const values = [id];
    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data[0].isEdited);
    });
  });
};
