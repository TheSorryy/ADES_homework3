const express = require("express");
const app = express();

// import the User model
const User = require("./models/User");


// import body-parser middleware
const bodyParser = require("body-parser");

// use the middleware
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());

const jwt = require("jsonwebtoken");
const JWT_SECRET = 'jwt-secret-key-do-not-share';

const isLoggedInMiddleware = require("./isLoggedInMiddleware");

app.post("/login/", (req, res) => {
  User.verify(
    req.body.username,
    req.body.password,
    (error, user) => {
      if (error) {
        next(error);
        return;
      }
      if (user === null) {
        res.status(401).send();
        return;
      }
      const payload = { user_id: user.id };
      jwt.sign(payload, JWT_SECRET, { algorithm: "HS256" }, (error, token) => {
        if (error) {
          console.log(error);
          res.status(401).send();
          return;
        } 
        res.status(200).send({
          token: token,
          user_id: user.id
        });
      })
  });
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/users/", (req, res, next) => {
  User.findAll((error, users) => {
    if (error) {
      console.log(error);
      res.status(500).send();
    };
    res.status(200).send(users);
  });
});

app.get("/users/:userID/", (req, res, next) => {
    const userID = parseInt(req.params.userID);
    // if userID is not a number, send a 400.
    if (isNaN(userID)) {
        res.status(400).send();
        return;
    }

    User.findByID(userID, (error, user) => {
        if (error) {
            res.status(500).send();
            return;
        };

        // send a 404 if user is not found.
        if (user === null) {
            res.status(404).send();
            return;
        };
        res.status(200).send(user);
    });
});

app.post("/users/", (req, res, next) => {
  console.log(req.body);
    User.insert(req.body, (error, userID) => {
      if (error) {
        console.log(error);
        res.status(500).send();
        return;
      };
      res.status(201).send({
        userID
      });
    });
});



module.exports = app;