const { sequelize } = require('../models');
const Category = require('../models/Category');

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

const updateCategory = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { name } = req.body;

    let category = await db.Category.findByPk(id);
    category.name = name;
    category = await category.save();

    res.send(category);
  } catch (error) {
    console.log(error);
    res.end();
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const id = req.params.id;
    const category = await db.Category.findByPk(id);
    await category.destroy();
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Somthing went wrong' });
  }
};

module.exports = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};
