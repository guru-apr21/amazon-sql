const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Cart.init(sequelize, DataTypes);
}

class Cart extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    cart_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'user_id'
      }
    }
  }, {
    sequelize,
    tableName: 'carts',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "cart_id" },
        ]
      },
      {
        name: "fk_carts_users1_idx",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  return Cart;
  }
}
