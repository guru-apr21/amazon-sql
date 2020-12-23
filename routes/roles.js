const express = require('express');
const router = express.Router();
const { sequelize } = require('../models');
const db = require('../models/init-models')(sequelize);

router.get('/', async (req, res, next) => {
  try {
    const roles = await db.Role.findAll({ include: db.User });
    res.json(roles);
  } catch (error) {
    console.log(error);
    res.status(500).json('Something went wrong!');
  }
});

router.post('/', async (req, res, next) => {
  const role = await db.Role.create({ name: req.body.name });
  res.json(role.toJSON());
});

router.delete('/:id', async (req, res, next) => {
  const role = await db.Role.destroy({
    where: {
      role_id: 1,
    },
  });
  res.json(role);
});

router.put('/:id', async (req, res, next) => {
  const role = await db.Role.update(
    { name: req.body.name },
    { where: { role_id: req.params.id } }
  );
  res.json(role);
});

module.exports = router;
