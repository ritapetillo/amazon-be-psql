const express = require("express");
const cartRouter = express.Router();
const Cart = require("../../utils/db").Cart;

cartRouter.get("/", async (req, res, next) => {
  try {
    const carts = await Cart.findAll();
    res.status(200).send({ carts });
  } catch (err) {
    console.log(err);
  }
});

cartRouter.get("/:userId", async (req, res, next) => {
  try {
    const cart = await Cart.findAll({ where: { userId: req.params.userId } });
    res.status(200).send({ cart });
  } catch (err) {
    console.log(err);
  }
});

cartRouter.post("/", async (req, res, next) => {
  try {
    const newCart = await Cart.create(req.body);
    res.status(200).send({ newCart });
  } catch (err) {
    console.log(err);
  }
});

cartRouter.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const cartUpdate = await Cart.update(req.body, {
      returning: true,
      plain: true,
      where: {
        id,
      },
    });
    res.status(200).send({ cartUpdate });
  } catch (err) {
    console.log(err);
  }
});

cartRouter.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const cartToDestroy = await Cart.destroy({ where: { id } });
    res.status(200).send({ cartToDestroy });
  } catch (err) {
    console.log(err);
  }
});
module.exports = cartRouter;
