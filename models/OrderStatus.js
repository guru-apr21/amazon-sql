const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return OrderStatus.init(sequelize, DataTypes);
}

class OrderStatus extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    order_status_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'order_statuses',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "order_status_id" },
        ]
      },
    ]
  });
  return OrderStatus;
  }
}
