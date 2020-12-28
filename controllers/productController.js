const { sequelize } = require('../models');

const db = require('../models/init-models')(sequelize);

const createProduct = async (req, res, next) => {
  try {
    const { error } = db.Product.validateNewProduct(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { user_id } = req.loggedInUser;
    console.log(user_id);

    const { title, quantity_in_stock, unit_price, category_id } = req.body;

    const category = await db.Category.findByPk(category_id);

    if (!category) {
      return res.status(404).json({ error: "Category doesn't exist!" });
    }

    const product = await db.Product.create({
      title,
      quantity_in_stock,
      unit_price,
      user_id,
      category_id,
    });

    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
};

module.exports = { createProduct };
