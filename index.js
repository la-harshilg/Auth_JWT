const express = require("express"),
  app = express(),
  authRoute = require("./routes/authRoute"),
  postRoute = require("./routes/postRoute"),
  auth = require("./middleware/auth.js")(),
  mongoose = require("mongoose"),
  passport = require("passport"),
  localStrategy = require("passport-local"),
  User = require("./models/user"),
  bodyParser = require("body-parser"),
  expressSession = require("express-session");

const MONGO_URL =
  "mongodb+srv://nasa-api:xdKMwhIpWg5FQBXP@nasacluster.bbuhx7z.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(MONGO_URL);

app.use(
  expressSession({
    secret: "secret",
    resave: false,
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(auth.initialize());
// Passport Config
passport.use(new localStrategy(User.authenticate()));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(authRoute);
app.use(postRoute);

app.listen(3001, () => {
  console.log("Server Started at 3001");
});
