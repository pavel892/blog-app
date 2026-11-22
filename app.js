import express from "express";
import { randomUUID } from "node:crypto";

import methodOverride from "method-override";

const app = express();
const PORT = 5000;

let posts = [];

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// EJS setup
app.set("view engine", "ejs");

// Static files
app.use(express.static("public"));

// Routes
app.get("/", (req, res) => {
  res.render("index", { posts });
});

app.get("/posts/new", (req, res) => {
  res.render("posts/new");
});

app.post("/posts/", (req, res) => {
  const postDetails = req.body;
  const id = randomUUID();

  posts.push({
    id: id,
    title: postDetails.title,
    content: postDetails.content,
  });

  res.redirect("/");
});

app.get("/posts/:id", (req, res) => {
  const { id } = req.params;

  const post = posts.find((post) => post.id === id);

  if (!post) {
    return res.status(404).send("Post not found");
  }

  res.render("posts/show", { post });
});

app.get("/posts/:id/edit", (req, res) => {
  const { id } = req.params;

  const post = posts.find((post) => post.id === id);

  res.render("posts/edit", { post });
});

app.patch("/posts/:id", (req, res) => {
  const { id } = req.params;

  const post = posts.find((post) => post.id === id);

  if (!post) {
    return res.status(404).send("Post not found");
  }

  post.title = req.body.title;
  post.content = req.body.content;

  res.redirect(`/posts/${id}`);
});

app.delete("/posts/:id", (req, res) => {
  const { id } = req.params;

  posts = posts.filter((post) => post.id !== id);

  res.redirect("/");
});

// Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
