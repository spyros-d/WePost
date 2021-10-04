const express = require('express');
const router = express.Router();
const Article = require('../models/article');

// All Articles Route
router.get('/', async (req, res) => {
    let searchOptions = {};
    if (req.query.title != null && req.query.title !== '') {
        searchOptions.title = new RegExp(req.query.title, 'i');
    }
    try {
        const articles = await Article.find({});
        res.render('articles/index', {
            articles: articles,
        });
    } catch {
        res.redirect('/articles');
    }
});

// NEW Article Route
router.get('/new', (req, res) => {
    res.render('articles/new', { article: new Article() });
});

// Create Article Route
router.post('/', async (req, res) => {
    const article = new Article({
        title: req.body.title,
        author: req.body.author,
        creationDate: new Date(req.body.creationDate),
        description: req.body.description,
    });
    try {
        const newArticle = await article.save();
        res.redirect('articles/');
    } catch {
        res.render('articles/new', {
            article: article,
            errorMessage: 'Error Creating Article', 
        });
    }
});

module.exports = router;