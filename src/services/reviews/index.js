const express = require("express");
const reviewRouter = express.Router();
const Review = require("../../utils/db").Review;

reviewRouter.get("/", async (req, res, next) => {
  try {
    const reviews = await Review.findAll();
    res.status(200).send({ reviews });
  } catch (err) {
    console.log(err);
  }
});

reviewRouter.get("/:id", async (req, res, next) => {
  try {
    const review = await Review.findByPk(req.params.id);
    res.status(200).send({ review });
  } catch (err) {
    console.log(err);
  }
});

reviewRouter.post("/", async (req, res, next) => {
  try {
    const newReview = await Review.create(req.body);
    res.status(200).send({ newReview });
  } catch (err) {
    console.log(err);
  }
});

reviewRouter.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const reviewUpdate = await Review.update(req.body, {
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

reviewRouter.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const reviewToDestroy = await Review.destroy({ where: { id } });
    res.status(200).send({ reviewToDestroy });
  } catch (err) {
    console.log(err);
  }
});
module.exports = reviewRouter;
