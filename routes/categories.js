const express = require('express');
const router = express.Router();
const Category = require('../models/category');
const Product = require('../models/product');

/* GET users listing. */
router.get('/', function(req, res, next) {
  Category.find({}, function(err, categories) {
    if (err) throw err;
    res.render('all_categories', { categories: categories });
  });
});

// Add new Categories
router.get('/add/', function(req, res, next) {
  res.render('add_category');
});

// Add new Category POST request
router.post('/add/', function(req, res, next) {
  const category = new Category({ name: req.body.name, description: req.body.description });

  category.save(function(err) {
    if (err) {
      throw err;
    }
    console.log('New Category' + category);
    res.redirect('/categories');
  });
});

router.get('/:categoryId', function(req, res, next) {
  Product.find({ category: req.params.categoryId })
    .populate('category')
    .exec(function(err, products) {
      if (err) throw err;
      console.log(products);
      res.render('category_products', { products: products });
    });
});

module.exports = router;
