const { sequelize } = require('../models');
const db = require('../models/init-models')(sequelize);
const bcrypt = require('bcrypt');

const createUser = async (req, res, next) => {
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

    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
};

const signInUser = async (req, res, next) => {
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
    if (!isMatched) {
      return res.status(401).json({ error: 'Invalid credentials!' });
    }

    const token = user.genAuthToken();

    res.json({ token });
  } catch (error) {
    res.json('Something went wrong!');
    console.log(error);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await db.User.findAll();
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
};

module.exports = { createUser, signInUser, getUsers };
