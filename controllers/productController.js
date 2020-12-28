const { sequelize } = require('../models');

const db = require('../models/init-models')(sequelize);

const createProduct = async (req, res, next) => {
  //   const { user_id, email } = req.loggedInUser;
  const user = await db.User.findOne({
    where: { email: 'guru.apr21@gmail.com' },
    include: db.Role,
  });
  console.log(user);

  if (user.Role.name === 'buyer') {
    return res.status(403).json({ error: 'Access denied!' });
  }

  const { title, quantity_in_stock, unit_price, category_id } = req.body;

  const product = db.Product.create({
    title,
    quantity_in_stock,
    unit_price,
    user_id: user.user_id,
    category_id,
  });

  res.json(product.toJSON());
};

module.exports = { createProduct };
