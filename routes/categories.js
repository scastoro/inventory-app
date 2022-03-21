const express = require('express');
const router = express.Router();
const Category = require('../models/category');

/* GET users listing. */
router.get('/', function(req, res, next) {
  Category.find({}, function(err, categories) {
    if (err) throw err;
    res.render('all_categories', { categories: categories });
  });
});

module.exports = router;
