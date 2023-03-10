const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const methodOverride = require("method-override");

require("./utils/db");
const Blog = require("./model/blog");

const app = express();
const port = 3000;

// setup method override
app.use(methodOverride("_method"));

// set up flash
app.use(cookieParser("secret"));
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

// set up ejs
app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// page home
app.get("/blog", async (req, ress) => {
  const blog = await Blog.find();

  ress.render("home", {
    title: "Home",
    layout: "layouts/main-layouts",
    blog,
    msg: req.flash("msg"),
  });
});

// page form create
app.get("/create", (req, ress) => {
  ress.render("create", {
    title: "Create",
    layout: "layouts/main-layouts",
  });
});

// process create
app.post("/blog", (req, res) => {
  Blog.insertMany(req.body).then((ress) => {
    req.flash("msg", "Create New Blog");
    res.redirect("/blog");
  });
});

// page form edit
app.get("/blog/edit/:_id", async (req, ress) => {
  const blog = await Blog.findOne({ _id: req.params._id });

  ress.render("edit", {
    title: "Edit",
    layout: "layouts/main-layouts",
    blog,
  });
});

// page proses update
app.put("/blog/update", (req, res) => {
  Blog.updateOne(
    { _id: req.body._id },
    {
      $set: {
        title: req.body.title,
        content: req.body.content,
      },
    }
  ).then((ress) => {
    req.flash("msg", "Update Blog");
    res.redirect("/blog");
  });
});

// process delete
app.delete("/blog/destroy", (req, res) => {
  Blog.deleteOne({ _id: req.body._id }).then((ress) => {
    req.flash("msg", "Delete Blog");
    res.redirect("/blog");
  });
});

// page detail
app.get("/blog/:_id", async (req, res) => {
  const blog = await Blog.findOne({ _id: req.params._id });

  res.render("detail", {
    title: "detail",
    layout: "layouts/main-layouts",
    blog,
  });
});

app.listen(port, () => {
  console.log("Server running on port http://localhost:3000");
});
