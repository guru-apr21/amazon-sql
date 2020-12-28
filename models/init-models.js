var DataTypes = require('sequelize').DataTypes;
var _CartItem = require('./CartItem');
var _Category = require('./Category');
var _OrderItem = require('./OrderItem');
var _OrderStatus = require('./OrderStatus');
var _Order = require('./Order');
var _Product = require('./Product');
var _Role = require('./Role');
var _User = require('./User');

function initModels(sequelize) {
  var CartItem = _CartItem(sequelize, DataTypes);
  var Category = _Category(sequelize, DataTypes);
  var OrderItem = _OrderItem(sequelize, DataTypes);
  var OrderStatus = _OrderStatus(sequelize, DataTypes);
  var Order = _Order(sequelize, DataTypes);
  var Product = _Product(sequelize, DataTypes);
  var Role = _Role(sequelize, DataTypes);
  var User = _User(sequelize, DataTypes);

  User.belongsToMany(Product, {
    through: CartItem,
    foreignKey: 'user_id',
    otherKey: 'product_id',
  });
  Product.belongsToMany(User, {
    through: CartItem,
    foreignKey: 'product_id',
    otherKey: 'user_id',
  });
  Product.belongsToMany(Order, {
    through: OrderItem,
    foreignKey: 'product_id',
    otherKey: 'order_id',
  });
  Order.belongsToMany(Product, {
    through: OrderItem,
    foreignKey: 'order_id',
    otherKey: 'product_id',
  });
  CartItem.belongsTo(Product, { foreignKey: 'product_id' });
  Product.hasMany(CartItem, { foreignKey: 'product_id' });
  CartItem.belongsTo(User, { foreignKey: 'user_id' });
  User.hasMany(CartItem, { foreignKey: 'user_id' });
  OrderItem.belongsTo(Order, { foreignKey: 'order_id' });
  Order.hasMany(OrderItem, { foreignKey: 'order_id' });
  OrderItem.belongsTo(Product, { foreignKey: 'product_id' });
  Product.hasMany(OrderItem, { foreignKey: 'product_id' });
  Order.belongsTo(OrderStatus, { foreignKey: 'status' });
  OrderStatus.hasMany(Order, { foreignKey: 'status' });
  Order.belongsTo(User, { foreignKey: 'user_id' });
  User.hasMany(Order, { foreignKey: 'user_id' });
  Product.belongsTo(Category, { foreignKey: 'category_id' });
  Category.hasMany(Product, { foreignKey: 'category_id' });
  Product.belongsTo(User, { foreignKey: 'user_id' });
  User.hasMany(Product, { foreignKey: 'user_id' });
  User.belongsTo(Role, { foreignKey: 'role_id' });
  Role.hasMany(User, { foreignKey: 'role_id' });

  return {
    CartItem,
    Category,
    OrderItem,
    OrderStatus,
    Order,
    Product,
    Role,
    User,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
