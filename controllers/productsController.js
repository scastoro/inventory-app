const Product = require('../models/product');
const Category = require('../models/category');

exports.products_list = function(req, res, next) {
  Product.find({}, function(err, products) {
    if (err) throw err;
    res.render('all_products', { products: products });
  });
};

exports.products_add_get = async function(req, res, next) {
  const categories = await Category.find({});
  res.render('add_product', { categories: categories });
};

exports.products_add_post = function(req, res, next) {
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
};

exports.products_show_product = function(req, res, next) {
  Product.findById(req.params.productId)
    .populate('category')
    .exec(function(err, product) {
      if (err) throw err;
      res.render('product', { product: product });
    });
};

exports.products_delete = async function(req, res, next) {
  Product.deleteOne({ _id: req.params.productId }, function(err, response) {
    if (err) throw err;
    console.log(response);
    res.redirect('/products');
  });
};

exports.products_edit_get = async function(req, res, next) {
  const product = await Product.findById(req.params.productId).populate('category');
  const categories = await Category.find({});

  console.log(product.category[0].id);
  res.render('edit_product', { product: product, categories: categories });
};

exports.products_edit_post = async function(req, res, next) {
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
};
