const { sequelize } = require('../models');

const db = require('../models/init-models')(sequelize);

const getCategories = async (req, res, next) => {
  const categories = await db.Category.findAll({
    include: { model: db.Product },
  });
  res.json(categories);
};

const createCategory = async (req, res, next) => {
  try {
    const category = await db.Category.create({
      name: req.body.name,
    });
    res.json(category.toJSON());
  } catch (error) {
    res.end();
    console.log(error);
  }
};

module.exports = { createCategory, getCategories };
