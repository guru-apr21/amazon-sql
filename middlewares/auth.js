const jwt = require('jsonwebtoken');
const { sequelize } = require('../models');
const db = require('../models/init-models')(sequelize);

module.exports = async (req, res, next) => {
  try {
    console.log('I am here!');
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(401).json({ error: 'No token provided!' });
    }

    const decoded = jwt.verify(token, 'jwtsecretkey');

    const user = await db.User.findOne({ where: { email: decoded.email } });
    if (!user) {
      return res.status(404).json({ error: "User doesn't exists!" });
    }

    req.loggedInUser = user.toJSON();
    next();
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong!!' });
    console.log(error);
  }
};
