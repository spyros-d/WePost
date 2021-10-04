const express = require('express');
const router = express.Router();
const Article = require('../models/article');
const author = require('../models/author');
const Author = require('../models/author');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

// All Articles-By-Author Route
router.get('/', async (req, res) => {
    let searchOptions = {};
    if (req.query.title != null && req.query.title !== '') {
        searchOptions.title = new RegExp(req.query.title, 'i');
    }
    try {
        const authors = await Author.find({});
        const articles = await Article.find({author: 'Hemingway'});
        res.render('authorArticles/index', {
            articles: articles,
        });
    } catch {
        res.redirect('/authorArticles');
    }
});

router.get('/new', (req, res) => {
    res.render('authorArticles/', { article: new Article() });
});

module.exports = router;