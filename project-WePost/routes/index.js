const express = require('express');
const router = express.Router();
const Article = require('../models/article');
const mongoose = require('mongoose');
const Author = require('../models/author');

router.get('/', async (req, res, next) => {
    let articles;
    try {
        articles = await Article.find().sort({ creationDate: 'desc' }).limit(10).exec();
    } catch {
        articles = [];
    }
    res.render('index', { articles });
});

function filterArticles(docs) {
    const author = new Author({
        name: req.body.name
    });
    // console.log('filter articles by author...');
}

module.exports = router;
