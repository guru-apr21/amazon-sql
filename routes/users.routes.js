const express = require('express');
const { sequelize } = require('../models');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../models/init-models')(sequelize);
const { userController } = require('../controllers');

router.post('/signup', userController.createUser);

router.post('/signin', userController.signInUser);

router.get('/', async (req, res, next) => {
  try {
    const users = await db.User.findAll({
      include: { model: db.Role },
      attributes: ['first_name', 'last_name', 'email', 'date_registered'],
    });
    // const users = await sequelize.query(
    //   `
    // SELECT u.first_name, u.last_name, r.name AS role
    // FROM roles r
    // LEFT JOIN users u
    //   USING(role_id)
    // WHERE r.name LIKE "%buyer%"`,
    //   { type: QueryTypes.SELECT }
    // );
    res.json(users);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
