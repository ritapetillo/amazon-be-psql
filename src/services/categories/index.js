const express = require("express");
const categoryRouter = express.Router();
const Category = require("../../utils/db").Category;
const Product = require("../../utils/db").Product;

const { Op, Sequelize } = require("sequelize");

categoryRouter.get("/", async (req, res, next) => {
  try {
    const categories = await Category.findAll();
    res.status(200).send({ categories });
  } catch (err) {
    console.log(err);
  }
});


categoryRouter.get("/:id/count", async (req, res, next) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: Article,
      attributes: [
        "article.id",
        [Sequelize.fn("COUNT", Sequelize.col("article.id")), "articlesCount"],
      ],
      group: ["category.id"],
    });

    
    res.status(200).send({ total });
  } catch (err) {
    console.log(err);
  }
});

categoryRouter.get("/:id", async (req, res, next) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: { model: Article },
    });
    const quantity = category.articles.length;
    res.status(200).send({ category, quantity });
  } catch (err) {
    console.log(err);
  }
});

categoryRouter.post("/", async (req, res, next) => {
  try {
    const newReview = await Category.create(req.body);
    res.status(200).send({ newReview });
  } catch (err) {
    console.log(err);
  }
});

categoryRouter.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const reviewUpdate = await Category.update(req.body, {
      returning: true,
      plain: true,
      where: {
        id,
      },
    });
    res.status(200).send({ reviewUpdate });
  } catch (err) {
    console.log(err);
  }
});

categoryRouter.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const reviewToDestroy = await Category.destroy({ where: { id } });
    res.status(200).send({ reviewToDestroy });
  } catch (err) {
    console.log(err);
  }
});
module.exports = categoryRouter;
