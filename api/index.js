import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";
import { db } from "./connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";
const app = express();
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import likeRoutes from "./routes/likes.js";
import commentRoutes from "./routes/comments.js";
import authRoutes from "./routes/auth.js";
import relationRoutes from "./routes/relationships.js";
import storyRoutes from "./routes/stories.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

// middlewares
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use("/images", express.static("./images"));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(cookieParser());

app.post("/api/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  res.status(200).json(`http://localhost:5000/images/${file.filename}`);
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/stories", storyRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/relationships", relationRoutes);
app.use("/api/comments", commentRoutes);

app.listen(5000, () => {
  console.log("listening on port 5000");
});

// Socket
import { Server } from "socket.io";

const io = new Server(4000, {
  cors: {
    origin: ["http://localhost:3000"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  const cookies = socket.handshake.headers.cookie;

  const token = cookies.match(/(?<==).*/)[0];
  if (!token) return 0;

  jwt.verify(token, "strongpassword123", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    socket.on("send_message", (data) => {
      socket.broadcast.emit("receive_message", {
        ...data,
        date: new Date(Date.now()),
      });
    });
    socket.on("receive_message", (data) => {
      const { msg, receiverid } = data;
      const q = `INSERT INTO messages (msg, senderid, receiverid, createdAt) VALUES (?)`;
      db.query(
        q,
        [
          [
            msg,
            userInfo.id,
            receiverid,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          ],
        ],
        (err, data) => {
          if (err) throw err;
          console.log(data);
        }
      );
    });
  });
});
