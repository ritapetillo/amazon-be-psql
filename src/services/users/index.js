const express = require("express");
const userRouter = express.Router();
const User = require("../../utils/db").User;
const jwt = require("jsonwebtoken");
const TOKEN_SECRET = process.env.TOKEN_SECRET;
const auth = require("../../utils/lib/privateRoutes");

userRouter.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).send({ users });
  } catch (err) {
    console.log(err);
  }
});
userRouter.get("/me", auth, async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await User.findOne({
      where: { id },
      attributes: {
        exclude: ["password", "id", "createdAt", "updatedAt"],
      },
    });
    res.status(200).send({ user });
  } catch (err) {
    console.log(err);
  }
});

userRouter.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.status(200).send({ user });
  } catch (err) {
    console.log(err);
  }
});

userRouter.post("/", async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    res.status(200).send({ newUser });
  } catch (err) {
    console.log(err);
  }
});
userRouter.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      const error = new Error(
        "There is no user associated with this email and password"
      );
      error.code = 404;
      next(error);
    } else if (!user.validatePassword(req.body.password)) {
      const error = new Error(
        "There is no user associated with this email and password"
      );
      error.code = 404;
      next(error);
    } else {
      const token = jwt.sign({ id: user.id }, TOKEN_SECRET);
      res.header("auth-token", token).send(token);
    }

    res.status(200).send({ newUser });
  } catch (err) {
    console.log(err);
  }
});

userRouter.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const userUpdate = await User.update(req.body, {
      returning: true,
      plain: true,
      where: {
        id,
      },
    });
    res.status(200).send({ userUpdate });
  } catch (err) {
    console.log(err);
  }
});

userRouter.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const userToDestroy = await User.destroy({ where: { id } });
    res.status(200).send({ userToDestroy });
  } catch (err) {
    console.log(err);
  }
});
module.exports = userRouter;
