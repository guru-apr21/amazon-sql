const { sequelize } = require('../models');

const db = require('../models/init-models')(sequelize);

const getProducts = async (req, res, next) => {
  try {
    const products = await db.Product.findAll();
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
};

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

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    let product = await db.Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found!' });
    }

    const { user_id, role_id } = req.loggedInUser;
    const hasAccessToProduct = product.user_id === user_id && role_id !== 1;
    if (!hasAccessToProduct) {
      return res.status(403).json({ error: 'Access denied!' });
    }

    product = await product.update({ ...req.body }, null, {
      skip: ['user_id'],
    });

    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
};

module.exports = { createProduct, updateProduct, getProducts };
