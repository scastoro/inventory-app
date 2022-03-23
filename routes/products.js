const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

// Render all products
router.get('/', productsController.products_list);

// Add new product get
router.get('/add', productsController.products_add_get);

// Add new product post
router.post('/add', productsController.products_add_post);

// Show individual product
router.get('/:productId', productsController.products_show_product);

// Delete product
router.post('/delete/:productId', productsController.products_delete);

// Populate edit products page with info from database
router.get('/edit/:productId', productsController.products_edit_get);

// Send form data to database
router.post('/edit/:productId', productsController.products_edit_post);

module.exports = router;
