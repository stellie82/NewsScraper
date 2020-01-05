// Required modules
var express = require("express");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");
var mongojs = require("mongojs");
var axios = require("axios");
var cheerio = require("cheerio");

// Setup Express app
var app = express();
var PORT = process.env.PORT || 8080;

// If deployed use the deployed DB, otherwise use the local mongoHeadlines DB
// var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
// mongoose.connect(MONGODB_URI);
// mongoose.connect("mongodb://localhost:27017/YourDB", { useNewUrlParser: true });

// Database configuration
var databaseUrl = "scraper";
var collections = ["newsData"];

// Hook mongojs configuration to the DB variable
var db = mongojs(databaseUrl, collections);
db.on("error", function(err) {
    console.log("Database Error:", err);
});

// Routes
app.get("/", function(req, res) {
    res.send("Hello world");
});

app.get("/all", function(req, res) {
    db.scrapeData.find({}, function(err, data) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(data);
        }
    });
});

app.get("/scrape", function(req, res) {
    axios.get("https://www.scientificamerican.com/section/lateststories/").then(function(response) {
        var $ = cheerio.load(response.data);
        var results = [];

        $(".listing-wide").each(function(i, element) {
            var title = $(element).find(".t_listing-title").text().trim();
            var link = $(element).find("a").attr("href");
            var img = $(element).find("img").attr("src");
            var summary = $(element).find("p.t_body").text().trim();

            results.push({
                title: title,
                link: link,
                image: img,
                summary: summary
            });
        });
        console.log(results);
        db.newsData.insert(results);
        res.send("scrape complete");
    });
});

// Start server to begin listening
app.listen(PORT, function () {
    console.log("Server listening on: http://localhost:" + PORT);
});
