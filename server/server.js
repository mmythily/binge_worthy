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

// ac
const checkPassword = require("./utils/checkPassword");
//const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');

//app.set('trust proxy', 1) // trust first proxy cookie-session

// app.use(cookieSession({
//   name: 'session',
//   keys: ['moviekey', 'foodkey'],
  
//   // Cookie Options
//   maxAge: 24 * 60 * 60 * 1000 // 24 hours
// }))

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


// Home page
app.get("/", (req, res) => {
  res.render("index");
});


// Login page
app.get("/login", (req, res) => {
  res.render("login");
});


// Login post - ac
app.post("/login", (req, res) => {
  if (req.body.email === "" || req.body.password === "") {
    res.status(400).send('Please submit a valid username and password');
  } else {
    console.log(req.body);
    let email = req.body.email;
    let inputPassword = req.body.password;
  
    // (email, inputPassword, callback)
    checkPassword.authenticateLogin(email, inputPassword, (userAuth) => {
      console.log('authValue: ', userAuth.authValue);

      if (userAuth.authValue === true) {
        
        //req.session.user_id = userAuth.id;  // cookie-parser
        res.cookie('user_id', userAuth.userId);
        //res.render("my-list"); // This not working

        res.render('my-list');
      } else {
        res.send('incorrect username and password');
      }

    })
  }

  // Success: req.session.user_id = user.id
  // Redirect

});
    

// Register page
app.get("/register", (reg, res) => {
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

// Get main page
app.get("/my-list", (req, res) => {
console.log(req.params);
  res.render("my-list");
});



// Get user specific page
app.get("/my-list/entries", (req, res) => {
  console.log(req.params);
  
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


// userInput
app.post("/my-list", (req, res) => {
  let cookieUser_id = req.cookies.user_id; // Getting cooking with c-parser
  let userInput = req.body.userInput;

  checkCat.createCategory(userInput, (data) => {
    // Knex insert request  
    knex
      .insert({
        user_id: cookieUser_id,
        item: userInput,
        category: data
      })
      .into('lists')
      .then( () => {
        knex('lists')
          .where({
            user_id: cookieUser_id,
            item: userInput
          }).select('id')
        .then((itemID) => {
        console.log(itemID[0].id);
        let itemId = itemID[0].id;
        res.json({category: data, entryID: itemId})
        }) 
      });
  });
  
  //res.render("my-list");
});


app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
