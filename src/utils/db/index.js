const { Sequelize, DataTypes } = require("sequelize");
const User = require("../models/User");
const Category = require("../models/Category");
const Product = require("../models/Product");
const Review = require("../models/Review");
const Cart = require("../models/Cart");

const sequelize = new Sequelize(
  process.env.PGDATABASE,
  process.env.PGUSER,
  process.env.PGPASSWORD,
  {
    host: process.env.PGHOST,
    dialect: "postgres",
  }
);
const models = {
  User: User(sequelize, DataTypes),
  Product: Product(sequelize, DataTypes),
  Review: Review(sequelize, DataTypes),
  Category: Category(sequelize, DataTypes),
  Cart: Cart(sequelize, DataTypes),
};

Object.keys(models).forEach((modelName) => {
  if ("associate" in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.Sequelize = Sequelize;
models.sequelize = sequelize;

module.exports = models;
