const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Category = require('../models/category');

router.get('/', function(req, res, next) {
  Product.find({}, function(err, products) {
    if (err) throw err;
    res.render('all_products', { products: products });
  });
});
// Add new product
router.get('/add', async function(req, res, next) {
  const categories = await Category.find({});
  res.render('add_product', { categories: categories });
});

router.post('/add', function(req, res, next) {
  const productDetail = {
    name: req.body.name,
    description: req.body.description,
    number_in_stock: req.body['in-stock'],
    price: req.body.price,
    category: [req.body.category],
    image: req.body.image,
  };

  const product = new Product(productDetail);

  product.save(function(err) {
    if (err) {
      throw err;
    }
    console.log('New Product: ' + product);
    res.redirect('/products');
  });
});

router.get('/:productId', function(req, res, next) {
  Product.findById(req.params.productId)
    .populate('category')
    .exec(function(err, product) {
      if (err) throw err;
      res.render('product', { product: product });
    });
});

// Populate edit products page with info from database
router.get('/edit/:productId', async function(req, res, next) {
  const product = await Product.findById(req.params.productId).populate('category');
  const categories = await Category.find({});

  console.log(product.category[0].id);
  res.render('edit_product', { product: product, categories: categories });
});

// Send form data to database
router.post('/edit/:productId', async function(req, res, next) {
  Product.findByIdAndUpdate(
    req.params.productId,
    {
      name: req.body.name,
      description: req.body.description,
      number_in_stock: req.body['in-stock'],
      price: req.body.price,
      category: [req.body.category],
      image: req.body.image,
    },
    function(err, docs) {
      if (err) throw err;
      console.log(docs);
    }
  );
  res.redirect('/products/' + req.params.productId);
});

module.exports = router;
