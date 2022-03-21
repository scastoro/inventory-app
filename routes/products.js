const express = require('express');
const router = express.Router();
const Product = require('../models/product');

router.get('/', function(req, res, next) {
  Product.find({}, function(err, products) {
    if (err) throw err;
    res.render('all_products', { products: products });
  });
});
router.get('/:productId', function(req, res, next) {
  Product.find({ _id: req.params.productId })
    .populate('category')
    .exec(function(err, product) {
      if (err) throw err;
      res.render('product', { product: product[0] });
    });
});
module.exports = router;
