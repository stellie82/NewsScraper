var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");

module.exports = function(app) {
    app.get("/", function(req, res) {
        res.render("index");
    });

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

    app.get("/articles", function(req, res) {
        db.Article.find({})
            .then(function(dbArticle) {
                res.json(dbArticle);
            })
            .catch(function(err) {
                res.json(err);
            });
    });

    app.get("/articles/:id", function(req, res) {
        db.Article.findOne({_id: req.params.id})
            .populate("note")
            .then(function(dbArticle) {
                res.json(dbArticle);
            })
            .catch(function(err) {
                res.json(err);
            });
    });

    // app.post("/articles/:id", function(req, res) {
    //     db.Note.create(req.body)
    //         .then(function(dbNote) {
    //             return db.Article.findOneAndUpdate(
    //                 {_id: req.params.id},
    //                 {note: dbNote._id}
    //             );
    //         }).then(function(dbArticle) {
    //             res.json(dbArticle);
    //         })
    //         .catch(function(err) {
    //             console.log(err);
    //         });
    // });
};
