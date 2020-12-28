const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Product.init(sequelize, DataTypes);
};

class Product extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    super.init(
      {
        product_id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          comment: 'Maintain product details',
        },
        title: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        quantity_in_stock: {
          type: DataTypes.SMALLINT,
          allowNull: false,
        },
        unit_price: {
          type: DataTypes.DECIMAL(9, 2),
          allowNull: false,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'users',
            key: 'user_id',
          },
        },
        category_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'categories',
            key: 'category_id',
          },
        },
      },
      {
        sequelize,
        tableName: 'products',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'product_id' }],
          },
          {
            name: 'fk_products_users1_idx',
            using: 'BTREE',
            fields: [{ name: 'user_id' }],
          },
          {
            name: 'fk_products_categories1_idx',
            using: 'BTREE',
            fields: [{ name: 'category_id' }],
          },
        ],
      }
    );
    return Product;
  }

  static validateNewProduct(value) {
    const schema = Joi.object({
      title: Joi.string().required(),
      quantity_in_stock: Joi.number().required(),
      unit_price: Joi.number().required(),
      category_id: Joi.number().required(),
    });
    return schema.validate(value);
  }
}
