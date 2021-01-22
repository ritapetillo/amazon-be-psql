const sequelizePaginate = require("sequelize-paginate");

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("products", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    qt_available: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    UPC: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  Product.associate = (models) => {
    Product.belongsTo(models.Category);
    Product.hasMany(models.Review);
    Product.hasMany(models.Cart);
  };
  sequelizePaginate.paginate(Product);

  return Product;
};
