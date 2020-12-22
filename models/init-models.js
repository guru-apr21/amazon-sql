var DataTypes = require("sequelize").DataTypes;
var _cart_items = require("./cart_items");
var _carts = require("./carts");
var _categories = require("./categories");
var _order_items = require("./order_items");
var _order_statuses = require("./order_statuses");
var _orders = require("./orders");
var _products = require("./products");
var _roles = require("./roles");
var _users = require("./users");

function initModels(sequelize) {
  var cart_items = _cart_items(sequelize, DataTypes);
  var carts = _carts(sequelize, DataTypes);
  var categories = _categories(sequelize, DataTypes);
  var order_items = _order_items(sequelize, DataTypes);
  var order_statuses = _order_statuses(sequelize, DataTypes);
  var orders = _orders(sequelize, DataTypes);
  var products = _products(sequelize, DataTypes);
  var roles = _roles(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  products.belongsToMany(carts, { through: cart_items, foreignKey: "product_id", otherKey: "cart_id" });
  carts.belongsToMany(products, { through: cart_items, foreignKey: "cart_id", otherKey: "product_id" });
  products.belongsToMany(orders, { through: order_items, foreignKey: "product_id", otherKey: "order_id" });
  orders.belongsToMany(products, { through: order_items, foreignKey: "order_id", otherKey: "product_id" });
  cart_items.belongsTo(carts, { foreignKey: "cart_id"});
  carts.hasMany(cart_items, { foreignKey: "cart_id"});
  cart_items.belongsTo(products, { foreignKey: "product_id"});
  products.hasMany(cart_items, { foreignKey: "product_id"});
  carts.belongsTo(users, { foreignKey: "user_id"});
  users.hasMany(carts, { foreignKey: "user_id"});
  order_items.belongsTo(orders, { foreignKey: "order_id"});
  orders.hasMany(order_items, { foreignKey: "order_id"});
  order_items.belongsTo(products, { foreignKey: "product_id"});
  products.hasMany(order_items, { foreignKey: "product_id"});
  orders.belongsTo(order_statuses, { foreignKey: "status"});
  order_statuses.hasMany(orders, { foreignKey: "status"});
  orders.belongsTo(users, { foreignKey: "user_id"});
  users.hasMany(orders, { foreignKey: "user_id"});
  products.belongsTo(categories, { foreignKey: "category_id"});
  categories.hasMany(products, { foreignKey: "category_id"});
  products.belongsTo(users, { foreignKey: "user_id"});
  users.hasMany(products, { foreignKey: "user_id"});
  users.belongsTo(roles, { foreignKey: "role_id"});
  roles.hasMany(users, { foreignKey: "role_id"});

  return {
    cart_items,
    carts,
    categories,
    order_items,
    order_statuses,
    orders,
    products,
    roles,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
