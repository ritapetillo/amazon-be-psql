module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define("reviews", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    rate: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  Review.associate = (models) => {
    Review.belongsTo(models.Product);
    Review.belongsTo(models.User);
  };
  return Review;
};
