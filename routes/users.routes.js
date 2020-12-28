const express = require('express');
const { sequelize } = require('../models');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../models/init-models')(sequelize);
const { userController } = require('../controllers');

router.post('/signup', userController.createUser);

router.post('/signin', userController.signInUser);

router.get('/', userController.getUsers);

module.exports = router;
