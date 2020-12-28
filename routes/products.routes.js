const express = require('express');
const router = express.Router();
const { productController } = require('../controllers');
const isLoggedIn = require('../middlewares/auth');

router.get('/', productController.getProducts);

router.get('/:id', productController.getProductById);

router.post('/', isLoggedIn, productController.createProduct);

router.put('/:id', isLoggedIn, productController.updateProduct);

router.delete('/:id', isLoggedIn, productController.deleteProduct);

module.exports = router;
