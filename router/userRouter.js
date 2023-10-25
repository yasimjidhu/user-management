const express = require("express");
const Router = express.Router();
const mongoose = require("mongoose");
const userSchema = require("../model/userSchema");
const { name } = require("ejs");

// Router for Signup page
Router.get("/", (req, res) => {
  if (req.session.userlogged) {
    res.redirect("/userhome");
  } else {
    if (req.session.adminlogged) {
      res.redirect("/adminlogin/adminhome");
    } else {
      res.render("signup", { title: "Signup Page" });
    }
  }
});




// Router for User Login
Router.post("/userlogin", async (req, res) => {
  const { email, password } = req.body;
  const connects = await userSchema.findOne({
    email: email,
    password: password,
  });
  if (connects) {
    console.log("Login Successfull");
    (req.session.user = req.body.email),
      (req.session.userlogged = true),
      res.redirect("/userhome");
  } else {
    console.log("Login failed");
    res.render("userlogin", { err: "invalid email or password" });
  }
});



// Router for user signup
Router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  if(!name || !email || !password){
   return res.render('signup',{title:"signup page",err:"please fillout all fields"})
  }
  // Check if the user with the same name already exists in the database
  const existingUser = await userSchema.findOne({ email: email });

  if (existingUser) {
    res.render("signup", {
      title: "Signup Page",
      err: "User already exist with this mail ",
    });
  } else {

    // Create a new user if no user with the same email exists
    const user = await userSchema.create(req.body);

    req.session.user = email;
    req.session.userlogged = true;
    res.redirect("/userhome");
  }
});



// Route for User Login
Router.get("/userlogin", (req, res) => {
  if (req.session.userlogged) {
    res.redirect("/userhome");
  } else {
    res.render("userlogin", { title: "Login Page" });
  }
});


// Home Routing
Router.get("/userhome", (req, res) => {
  if (req.session.userlogged) {
    res.render("userhome", {
      user: req.session.user,
      title: "Flipkart",
      mobile: [
        {
          Image:
            "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSQDaYf1Fw090hyRFGlfHxe7z6XfP-K2GoxdRvJUz-6-miUir9QCygBjEj_Squ6-JRFA0cZ3vQmIVZAxCxw6vlfz8y_unoDU37rF5MEqwQJHnlVF0RKdFEc&usqp=CAE",
          Brand: "Realme ",
          Model: "11pro 5G",
          Price: "32000",
        },
        {
          Image:
            "https://img.giznext.com/assets/model/1/11969/samsung-galaxy-s22-ultra-5g-c71957c58fb54b54b5eb65d0582249.jpg?width=360",
          Brand: "Samsung",
          Model: "S22 ultra",
          Price: "1,25000",
        },
        {
          Image:
            "https://www.gizmochina.com/wp-content/uploads/2020/10/Realme-7-Global.png",
          Brand: "Realme",
          Model: "realme 7",
          Price: "150000",
        },
        {
          Image: "https://static.toiimg.com/photo/msid-76294732/76294732.jpg",
          Brand: "Redmi",
          Model: "Redmi 9 pro",
          Price: "12000",
        },
        {
          Image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqSLQx_Qn2OJlNeZ1OGQb1zEKpvv8GIHV06eczQx6MZE9-luDyLl3wcjwTAfAkkNOvNcE&usqp=CAU",
          Brand: "Vivo",
          Model: "Y50",
          Price: "20000",
        },
        {
          Image:
            "https://static.toiimg.com/thumb/msid-100452209,width-400,resizemode-4/100452209.jpg",
          Brand: "Iqoo",
          Model: "Neo7",
          Price: "25000",
        },
        {
          Image:
            "https://img-prd-pim.poorvika.com/prodvarval/Oneplus-nord-ce-3-lite-5g-chromatic-grey-Front-Back-View-Thumbnail.png",
          Brand: "Oneplus",
          Model: "Nord",
          Price: "35000",
        },
        {
          Image: "https://www.wiki.tn/60415/infinix-hot-10-128go-noir.jpg",
          Brand: "Infinix",
          Model: "Hot 10",
          Price: "15000",
        },
      ],
    });
  } else {
    res.redirect("/");
  }
});

Router.get("/userlogout", (req, res) => {
  // Destroy the user's session to log them out
  req.session.destroy((err) => {
    if (err) {
      console.log("error destroying session", err);
      res.redirect("/");
    } else {
      res.redirect("/");
    }
  });
});
module.exports = Router;
