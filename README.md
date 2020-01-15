# Mongo News Articles Scraper

This application scrapes articles from a news website, in this case _Scientific American_, and loads them for a user to view and leave comments on.

Initially, the user can click on a button to scrape new articles or clear all articles from view.  Once articles are loaded, users are given the option to either save an article to a favorites-type list or delete an article from said list.  They will also be able to leave comments on saved articles for their own reference.

## Required Files

The news article scraper requires installation of a few Node modules, including:
* express: `npm install express`
* express-handlebars: `npm install express-handlebars`
* mongoose: `npm install mongoose`
* axios: `npm install axios`
* cheerio: `npm install cheerio`
* mongolab: `heroku addons:create mongolab`
* package.json file: `npm init -y`

## Technologies Used
* Javascript
* jQuery
* HTML/CSS
* Node
  * Express
  * Express-handlebars
  * Mongoose
  * Axios
  * Cheerio
* Heroku
    * mLab for remote MongoDB database
 
[Mongo News Article Scraper (Github)](https://github.com/stellie82/newsScraper.git)

[Try the app!](https://dashboard.heroku.com/apps/newsarticles-scraper)