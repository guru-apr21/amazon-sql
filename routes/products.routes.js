const express = require('express');
const router = express.Router();
const { productController } = require('../controllers');
const isLoggedIn = require('../middlewares/auth');

router.get('/', productController.getProducts);

router.post('/', isLoggedIn, productController.createProduct);

router.put('/:id', isLoggedIn, productController.updateProduct);

module.exports = router;
