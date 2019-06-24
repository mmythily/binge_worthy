"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("../knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

const checkPassword = require("./utils/checkPassword");
const cookieParser = require('cookie-parser');

app.use(cookieParser());

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");
const checkCat = require("./utils/checkCategory.js");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("../styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));


////////////////////////////////////////////////////////////////
////                  BROWSE / READ
///////////////////////////////////////////////////////////////

// Home page
app.get("/", (req, res) => {
  res.render("login");
});


// Get main page
app.get("/my-list", (req, res) => {
  res.render("my-list");
});

// Get user specific page
app.get("/my-list/entries", (req, res) => {
  let user_id = req.cookies.user_id; // cookie-something?
  knex
    .select('id', 'item', 'category')
    .from('lists')
    .where('user_id', user_id)
    .then((rows) => {
      let items = [];
      for (let row of rows) {
        items.push(rows[row]);
      }
      res.json(rows);
    })
});

////////////////////////////////////////////////////////////////
////                      EDIT
///////////////////////////////////////////////////////////////

// userInput
app.post("/my-list", (req, res) => {
  let cookieUser_id = req.cookies.user_id; // Getting cooking with c-parser
  let userInput = req.body.userInput;
  checkCat.createCategory(userInput, (data) => {
    // add new item to lists
    knex
      .insert({
        user_id: cookieUser_id,
        item: userInput,
        category: data
      })
      .into('lists')
      .then(() => {
        knex('lists')
          .where({
            user_id: cookieUser_id,
            item: userInput
          }).select('id')
          .then((itemID) => {
            console.log(itemID[0].id);
            let itemId = itemID[0].id;
            res.json({
              category: data,
              entryID: itemId
            })
          })
      });
  });
});

// Change ToDo Category
app.post("/my-list/item/update", (req, res) => {
  let updateCat = req.body.category;
  // knex('lists')
  //   .where('id', itemId)
  //   .update()
  //   .then(() => {
  //     res.render('my-list');
  //   })
});

////////////////////////////////////////////////////////////////
////                      AND
///////////////////////////////////////////////////////////////

////////////////   LOGIN ROUTES   //////////////////

// Login page
app.get("/login", (req, res) => {
  res.render("login");
});

// Login post - ac
app.post("/login", (req, res) => {
  if (req.body.email === "" || req.body.password === "") {
    res.status(400).send('Please submit a valid username and password');
  } else {
    let email = req.body.email;
    let inputPassword = req.body.password;
    checkPassword.authenticateLogin(email, inputPassword, (userAuth) => {
      if (userAuth.authValue === true) {
        res.cookie('user_id', userAuth.userId);
        res.redirect('/my-list');
      } else {
        res.send('incorrect username and password');
      }
    })
  }
});

////////////////   REGISTER ROUTES   //////////////////

// Register page
app.get("/register", (req, res) => {
  res.render("register");
})

// Register post
app.post("/register", (req, res) => {
  let inputEmail = req.body.email;
  let inputPassword = req.body.password;
  //if email or password are empty
  if (!inputEmail) {res.status(400).send('Invalid email.');}
  if (!inputPassword) {res.status(400).send('Invalid password.');}
  //check if email already in db, add if not:
  knex
  .select('email', 'id')
  .from('users')
  .where('email', inputEmail)
  .then((result) => {
    if (result.length > 0){
      res.status(400).send('A user with this email already exists.')        
    } else {
      knex
      .insert({
        name: 'dummyName',
        email: inputEmail,
        password: inputPassword
      })
      .into('users')
      .then((result) => {
        res.render('my-list');
      })
      .catch((err) => {
        res.status(500).send('Sorry, something went wrong. Please try again.')
      })
    }      
  })
});

////////////////////////////////////////////////////////////////
////                      DELETE
///////////////////////////////////////////////////////////////

// Delete ToDo item
app.post("/my-list/item/delete", (req, res) => {
  let itemId = req.body.entryId;
  knex('lists')
    .where('id', itemId)
    .del()
    .then( () => {
      res.render('my-list');
    })
});

////////////////////////////////////////////////////////////////
////                      UPDATE
///////////////////////////////////////////////////////////////

// Update ToDo category 
app.post("/update", (req, res) => {
  let itemId = req.body.entryId;
  let targetCategory = req.body.targetCategory;
  console.log('SERVER: ', itemId, targetCategory);

  knex('lists')
    .where('id', '=', itemId)
    .update({
      category: targetCategory,
    })
    .then( () => {
      console.log('update done');
      res.status(200);
    });
    
});


app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});