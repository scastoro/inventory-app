const express = require('express');
const categoriesController = require('../controllers/categoriesController');
const router = express.Router();

// List all Categories
router.get('/', categoriesController.categories_list);

// Add new Categories
router.get('/add/', categoriesController.categories_add_get);

// Add new Category POST request
router.post('/add/', categoriesController.categories_add_post);

// Delete Categories get
router.get('/delete/', categoriesController.categories_delete_get);

// Delete Categories post
router.post('/delete/', categoriesController.categories_delete_post);

// Render Products by Category
router.get('/:categoryId', categoriesController.categories_render_products);

module.exports = router;
