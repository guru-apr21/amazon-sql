const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Role.init(sequelize, DataTypes);
}

class Role extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    role_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'roles',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "role_id" },
        ]
      },
    ]
  });
  return Role;
  }
}
