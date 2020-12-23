const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
module.exports = (sequelize, DataTypes) => {
  return User.init(sequelize, DataTypes);
};

class User extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    super.init(
      {
        user_id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        first_name: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        last_name: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING(255),
          allowNull: false,
          unique: 'email_UNIQUE',
        },
        date_registered: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        encrypted_password: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        role_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 2,
          references: {
            model: 'roles',
            key: 'role_id',
          },
        },
      },
      {
        sequelize,
        tableName: 'users',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'user_id' }],
          },
          {
            name: 'email_UNIQUE',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'email' }],
          },
          {
            name: 'fk_users_roles_idx',
            using: 'BTREE',
            fields: [{ name: 'role_id' }],
          },
        ],
      }
    );
    return User;
  }

  genAuthToken() {
    return jwt.sign(
      { user_id: this.user_id, email: this.email },
      'jwtsecretkey',
      {
        expiresIn: '48h',
      }
    );
  }

  static validateSignIn(value) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
    return schema.validate(value);
  }

  static validateSignUp(value) {
    const schema = Joi.object({
      first_name: Joi.string().max(50).required(),
      last_name: Joi.string().max(50).required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      role_id: Joi.number().min(1).max(3),
    });
    return schema.validate(value);
  }
}
