const express = require('express');
const { sequelize } = require('../models');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../models/init-models')(sequelize);
const jwt = require('jsonwebtoken');

router.post('/signup', async (req, res, next) => {
  try {
    const { error } = db.User.validateSignUp(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { first_name, last_name, email, password } = req.body;

    let user = await db.User.findOne({ where: { email } });
    if (user) {
      return res.status(409).json({ error: 'User already exists!' });
    }

    const encrypted_password = await bcrypt.hash(password, 10);

    user = db.User.build({
      first_name,
      last_name,
      email,
      encrypted_password,
    });

    user = await user.save();
    const token = user.genAuthToken();

    console.log(user.toJSON());
    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

router.post('/signin', async (req, res, next) => {
  try {
    const { error } = db.User.validateSignIn(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { email, password } = req.body;

    const user = await db.User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials!' });
    }

    const isMatched = await bcrypt.compare(password, user.encrypted_password);
    console.log(isMatched);
    if (!isMatched) {
      return res.status(401).json({ error: 'Invalid credentials!' });
    }

    const token = user.genAuthToken();

    res.json({ token });
  } catch (error) {
    res.json('Something went wrong!');
    console.log(error);
  }
});

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
