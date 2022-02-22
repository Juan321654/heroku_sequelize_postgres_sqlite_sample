const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const { User, Post } = require("./models");
require("dotenv").config();

const { Client } = require("pg");
const client = new Client({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOSTNAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect();

app.get("/cats", (req, res) => {
  client.query("SELECT * FROM cats", (err, c_res) => {
    try {
      res.send(c_res.rows);
    } catch (error) {
      res.json({ error: error });
    }
  });
});

app.get("/pg-users", (req, res) => {
  client.query('SELECT * FROM users', (err, c_res) => {
    try {
      res.send(c_res.rows);
    } catch (error) {
      res.json({ error: error });
    }
  });
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Post,
        },
      ],
    });
    res.json(users);
  } catch (error) {
    res.json({ error: error });
  }
});

app.post("/users", async (req, res) => {
  // {
  //   "user" : {
  //         "username": "Youngo",
  //         "email": "super@email.com"
  //     }
  // }
  try {
    const { user } = req.body;
    const newUser = await User.create(user);
    res.json({ newUser });
  } catch (error) {
    res.json({ error: error });
  }
});

app.delete("/users/:id", async (req, res) => {
  // http://localhost:3000/users/87455c12-cb0a-4bb8-b03d-5f0b98052d3b
  const { id } = req.params;
  const user = await User.findByPk(id);
  await user.destroy();
  res.send(user);
});

app.post("/posts", async (req, res) => {
  // {
  //   "post" : {
  //       "content": "2 This is a post",
  //       "user_id": "87455c12-cb0a-4bb8-b03d-5f0b98052d3b"
  //   }
  // }
  const { post } = req.body;
  const newPost = await Post.create(post);
  res.send(newPost);
});

app.get("/posts", async (req, res) => {
  try {
    const userpost = await Post.findAll();
    return res.json(userpost);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
