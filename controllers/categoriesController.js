const Category = require('../models/category');
const Product = require('../models/product');

exports.categories_list = function(req, res, next) {
  Category.find({}, function(err, categories) {
    if (err) throw err;
    res.render('all_categories', { categories: categories });
  });
};

exports.categories_add_get = function(req, res, next) {
  res.render('add_category');
};

exports.categories_add_post = function(req, res, next) {
  const category = new Category({ name: req.body.name, description: req.body.description });

  category.save(function(err) {
    if (err) {
      throw err;
    }
    console.log('New Category' + category);
    res.redirect('/categories');
  });
};

exports.categories_render_products = function(req, res, next) {
  Product.find({ category: req.params.categoryId })
    .populate('category')
    .exec(function(err, products) {
      if (err) throw err;
      console.log(products);
      res.render('category_products', { products: products });
    });
};

exports.categories_delete_get = async function(req, res, next) {
  const usedCategories = await (await Product.find({}).select('category -_id')).map(
    (item) => item.category[0]
  );
  const allCategories = await Category.find({}, '_id name');
  const checkedCategories = allCategories.map((category) => {
    if (usedCategories.find((item) => item.equals(category.id))) {
      return {
        ...category._doc,
        isUsed: true,
      };
    } else {
      return {
        ...category._doc,
        isUsed: false,
      };
    }
  });
  res.render('delete_category', { checkedCategories: checkedCategories });
};

exports.categories_delete_post = async function(req, res, next) {
  const usedCategories = await (await Product.find({}).select('category -_id')).map(
    (item) => item.category[0]
  );

  console.log(Object.values(req.body), usedCategories);
  for (let category of Object.values(req.body)) {
    if (usedCategories.find((item) => item.equals(category))) {
      const err = new Error('Category in Use');
      err.status = 404;
      return next(err);
    } else {
      Category.deleteOne({ _id: category }, function(err, response) {
        if (err) throw err;
        console.log(response);
      });
    }
  }
  res.redirect('/categories/');
};
