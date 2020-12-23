const express = require('express');
const { sequelize } = require('../models');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../models/init-models')(sequelize);
const jwt = require('jsonwebtoken');
const { Op, QueryTypes } = require('sequelize');

router.post('/signup', async (req, res, next) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    const encrypted_password = await bcrypt.hash(password, 10);

    let user = db.User.build({
      first_name,
      last_name,
      email,
      encrypted_password,
    });

    user = await user.save();
    const token = jwt.sign(
      { user_id: user.user_id, email: user.email },
      'jwtsecretkey',
      {
        expiresIn: '48h',
      }
    );

    console.log(user.toJSON());
    res.json({ token });
  } catch (error) {
    console.log(error);
    res.json({ error: 'Something went wrong!' });
  }
});

router.post('/signin', async (req, res, next) => {
  try {
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

    const token = jwt.sign(
      { user_id: user.user_id, email: user.email },
      'jwtsecretkey',
      {
        expiresIn: '48h',
      }
    );
    res.json({ token });
  } catch (error) {
    res.json('Something went wrong!');
    console.log(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const users = await db.User.findAll({
      where: { '$Role.name$': { [Op.eq]: 'buyer' } },
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
