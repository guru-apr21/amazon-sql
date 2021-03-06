const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return CartItem.init(sequelize, DataTypes);
}

class CartItem extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    quantity: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    unit_price: {
      type: DataTypes.DECIMAL(9,2),
      allowNull: false
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'products',
        key: 'product_id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    }
  }, {
    sequelize,
    tableName: 'cart_items',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "product_id" },
          { name: "user_id" },
        ]
      },
      {
        name: "fk_cart_items_products1_idx",
        using: "BTREE",
        fields: [
          { name: "product_id" },
        ]
      },
      {
        name: "fk_cart_items_users1_idx",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  return CartItem;
  }
}
