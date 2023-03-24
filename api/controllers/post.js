import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getPosts = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  const { userId, searchInput } = req.query;

  if (!searchInput) {
    jwt.verify(token, "strongpassword123", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid");
      const q = userId
        ? `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) WHERE p.userId = ? ORDER BY p.createdAt DESC`
        : `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId)
    LEFT JOIN relationships AS r ON (p.userId = r.followedUserId) WHERE r.followerUserId= ? OR p.userId =?
    ORDER BY p.createdAt DESC`;

      const values = userId ? [userId] : [userInfo.id, userInfo.id];

      db.query(q, values, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
      });
    });
  } else {
    jwt.verify(token, "strongpassword123", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid");
      const q = `Select * from (SELECT p.*, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId)
        LEFT JOIN relationships AS r ON (p.userId = r.followedUserId) WHERE r.followerUserId= ? OR p.userId = ?
        ORDER BY p.createdAt DESC) as post_data WHERE post_data.desc LIKE ? OR post_data.name LIKE ?`;
      const values = [
        userInfo.id,
        userInfo.id,
        `%${searchInput}%`,
        `%${searchInput}%`,
      ];
      db.query(q, values, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
      });
    });
  }
};

export const addPost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  const { desc, img } = req.body;

  jwt.verify(token, "strongpassword123", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");
    const q =
      "INSERT INTO posts (`desc`, `img`, `createdAt`, `userId`) VALUES (?)";
    const values = [
      desc,
      img,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id,
    ];
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been created");
    });
  });
};

export const deletePost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  const { postId } = req.body;

  jwt.verify(token, "strongpassword123", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");
    const q = "DELETE FROM posts WHERE id = ? AND `userId` = ?";
    const values = [postId, userInfo.id];
    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows > 0) {
        return res.status(200).json("Post has been created");
      }
      return res.status(403).json("You can delete only your post");
    });
  });
};

export const updatePost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  const { title, img, id } = req.body;

  console.log(title, img);

  jwt.verify(token, "strongpassword123", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");
    const q = "UPDATE posts SET `desc`=?, `img`=? WHERE userid = ? && id = ?";
    const q2 =
      "UPDATE posts SET isEdited = isEdited + 1 WHERE id = ? AND userid = ?";
    const values = [title, img, userInfo.id, id];
    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been Updated");
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
    const q = "SELECT isEdited FROM posts WHERE id = ?";

    const values = [id];
    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json(data[0]?.isEdited);
    });
  });
};
