const express = require("express");
const Router = express.Router();
const mongoose = require("mongoose");
const adminSchema = require("../model/adminSchema");
const userSchema = require("../model/userSchema");
const { ObjectId } = require("mongodb");

const credentials = {
  email: "admin@gmail.com",
  password: 123,
};

// Route for Admin Login
Router.get("/", (req, res) => {
  if (req.session.adminlogged) {
    res.redirect("/adminlogin/adminhome");
  } else {
    res.render("adminlogin", { title: "Login Page" });
  }
});

// Router for Admin Authentication
Router.post("/adminlogin", async (req, res) => {
  if (
    req.body.email == credentials.email &&
    req.body.password == credentials.password
  ) {
    (req.session.admin = req.body.email),
      (req.session.adminlogged = true),
      res.redirect("/adminlogin/adminhome");
  } else {
    res.render("adminlogin", {
      title: "Admin Login",
      err: "Invalid email or password",
    });
  }
});

// Route for Admin Home Page
Router.get("/adminhome", async (req, res) => {
  // Retrieve user data and store it in the useData variable
  const useData = await userSchema.find(); // Modify this query as needed

  // Render the adminhome template and pass useData to it
  res.render("adminhome", { title: "Admin Panel", useData: useData });
});

// Router for Admin Logout
Router.get("/adminlogout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

// Insertion of users

Router.post("/add", async (req, res) => {
  console.log(req.body);
  const data = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  const newuser = await userSchema.insertMany([data]);
  res.redirect("/adminlogin/adminhome");
});

// Search User
Router.post("/search", async (req, res) => {
  var i = 0;
  const data = req.body;
  console.log(data);
  let useData = await userSchema.find({
    name: { $regex: "^" + data.search, $options: "i" },
  });
  console.log(`search data ${useData}`);
  res.render("adminhome", {
    title: "Home",
    user: req.session.user,
    useData,
    i,
  });
});

Router.get("/add", (req, res) => {
  res.render("./adduser",{title:'Add User'});
});

Router.get("/adduser", (req, res) => {
  res.render("adduser");
}); 

// Setting Deletion

Router.get("/delete/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const deleted = await userSchema.deleteOne({ _id: id });
  res.redirect("/adminlogin/adminhome");
});

// Edit User
Router.get("/edit/:id", async (req, res) => {
  const id = req.params.id;
  const dataone = await userSchema.findOne({ _id: new ObjectId(id) });
  res.render("userdata", { title: "userdata", dataone });
});

// Add user
Router.post("/update/:id", async (req, res) => {
  let newData = req.body;
  let id = req.params.id;
  await userSchema.updateOne(
    { _id: id },
    {
      $set: {
        name: newData.name,
        email: newData.email,
      },
    }
  );
  res.redirect("/adminlogin/adminhome");
});

module.exports = Router;
