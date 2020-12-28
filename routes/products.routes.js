const express = require('express');
const router = express.Router();
const { productController } = require('../controllers');
const isLoggedIn = require('../middlewares/auth');

router.post('/', isLoggedIn, productController.createProduct);

module.exports = router;
