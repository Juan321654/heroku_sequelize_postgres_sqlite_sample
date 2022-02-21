const express = require("express");
const app = express();
const port = 3000;
const { User, Post } = require("./models");

app.use(express.json());

app.get("/users", async (req, res) => {
  const users = await User.findAll({
    include: [
      {
        model: Post,
      },
    ],
  });
  res.send(users);
});

app.post("/users", async (req, res) => {
  // {
  //   "user" : {
  //         "username": "Youngo",
  //         "email": "super@email.com"
  //     }
  // }
  const { user } = req.body;
  const newUser = await User.create(user);
  res.send(newUser);
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
