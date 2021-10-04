const express = require('express');
const mongoose = require('mongoose');
const articleViews = require('../models/visit');

const articleViewsUp = async function() {
    try {
        await articleViews.findByIdAndUpdate("614e11401bc923bee8740a6f", {$inc: { counter: 1 }}, { new: true });
        data => console.log(data.counter);
    } catch {
        err => console.log(err)
    }
}

module.exports = {articleViewsUp}