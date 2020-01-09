// Required modules
var express = require("express");
var exphbs = require("express-handlebars");
var logger = require("morgan");
var mongoose = require("mongoose");

// Setup Express app
var app = express();
var PORT = process.env.PORT || 8080;

// Configure middleware
app.use(logger("dev"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/routes")(app);

// If deployed use the deployed DB, otherwise use the local mongoHeadlines DB
// var MONGODB_URI = (process.env.MONGODB_URI, {useUnifiedTopology: true,
//   useNewUrlParser: true}) || "mongodb://localhost/mongoHeadlines";
// mongoose.connect(MONGODB_URI);

// Mongo DB connection
mongoose.connect("mongodb://localhost/newsArticles", {useUnifiedTopology: true, useNewUrlParser: true});

// Start server to begin listening
app.listen(PORT, function () {
    console.log("Server listening on: http://localhost:" + PORT);
});
