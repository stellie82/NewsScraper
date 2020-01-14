// Required files or modules
var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");

module.exports = function(app) {
    // Route for homepage
    app.get("/", function(req, res) {
        db.Article.find({saved: false})
            .then(function(dbArticles) {
                res.render("index", {
                    articles: dbArticles
                });
            })
            .catch(function(err) {
                console.log(err);
            });
    });

    // Route to view saved articles list
    app.get("/saved-articles", function(req, res) {
        db.Article.find({saved: true})
            .then(function(dbArticles) {
                res.render("articles", {
                    articles: dbArticles
                });
            })
            .catch(function(err) {
                console.log(err);
            });
    });

    // Route to scrape Scientific American webpage
    app.get("/scrape", function(req, res) {
        axios.get("https://www.scientificamerican.com/section/lateststories/").then(function(response) {
            var $ = cheerio.load(response.data);

            $("article").each(function(i, element) {
                var results = {};

                results.title = $(".t_listing-title", element).text().trim();
                results.link = $(".t_listing-title a", element).attr("href");
                results.image = $("picture img", element).attr("src");
                results.summary = $(".t_body", element).text().trim();

                db.Article.create(results)
                    .then(function(dbArticle) {
                        console.log(dbArticle);
                    })
                    .catch(function(err) {
                        console.log(err);
                    });
            });
            res.send("scrape complete");
        });
    });

    // Route to view all articles in JSON
    app.get("/articles", function(req, res) {
        console.log(req.query);
        if (req.query.showSaved === "true") {
            query = {saved: true};
        } else {
            query = {};
        }
        db.Article.find(query)
            .then(function(dbArticles) {
                res.json(dbArticles);
            })
            .catch(function(err) {
                res.json(err);
            });
    });

    // Route to view article by ID
    app.get("/article/:id", function(req, res) {
        db.Article.findOne({_id: req.params.id})
            .populate("notes")
            .then(function(dbArticle) {
                res.json(dbArticle);
            })
            .catch(function(err) {
                res.json(err);
            });
    });

    // Route to post new note to article by ID
    app.post("/article/:id", function(req, res) {
        db.Note.create(req.body)
            .then(function(dbNote) {
                return db.Article.findOneAndUpdate(
                    {_id: req.params.id},
                    {$push: {notes: dbNote._id}},
                    {new: true}
                );
            })
            .then(function(dbArticle) {
                res.json(dbArticle);
            })
            .catch(function(err) {
                res.json(err);
            });
    });

    // Route to save article by ID to saved list
    app.get("/save-article/:id", function(req, res) {
        db.Article.updateOne({_id: req.params.id}, {saved: true})
            .then(function(writeOpResult) {
                res.json(writeOpResult);
            })
            .catch(function(err) {
                res.json(err);
            });
    });

    // Route to delete article by ID from saved list
    app.get("/delete-saved/:id", function(req, res) {
        db.Article.updateOne({_id: req.params.id}, {saved: false})
            .then(function(writeOpResult) {
                res.json(writeOpResult);
            })
            .catch(function(err) {
                res.json(err);
            });
    });

    // Route to clear articles and notes from saved list
    app.get("/articles/clear", function(req, res) {
        db.Article.deleteMany({})
            .then(function(deleteArticles) {
                res.json(deleteArticles);
            })
            .catch(function(err) {
                res.json(err);
            });
        db.Note.deleteMany({})
            .then(function(deleteArticles) {
                res.json(deleteArticles);
            })
            .catch(function(err) {
                res.json(err);
            });
    })
};