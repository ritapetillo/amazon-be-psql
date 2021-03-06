const express = require("express");
const productRouter = express.Router();
const Product = require("../../utils/db").Product;
const { Op, Sequelize } = require("sequelize");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../../utils/lib/cloudinary");
//multer settings
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "ecommerce",
  },
});
const parser = multer({ storage });

productRouter.get("/", async (req, res, next) => {
  try {
    //   const products = await Product.findAll();
    const options = {
      attributes: ["id", "name", "image", "price"],
      page: 1, // Default 1
      paginate: 25, // Default 25
      order: [["name", "DESC"]],
      // where: { name: { [Op.like]: req.query ? `%${req.query.name}%` : !null } },
    };
    const { docs, pages, total } = await Product.paginate(options);
    res.status(200).send({ docs, pages, total });
  } catch (err) {
    console.log(err);
  }
});

productRouter.get("/category/:id", async (req, res, next) => {
  try {
    //   const products = await Product.findAll();
    const options = {
      attributes: ["id", "name", "image", "price"],
      page: 1, // Default 1
      paginate: 25, // Default 25
      order: [["name", "DESC"]],
      where: { categoryId: req.params.id },
    };
    const { docs, pages, total } = await Product.paginate(options);
    res.status(200).send({ docs, pages, total });
  } catch (err) {
    console.log(err);
  }
});

productRouter.get("/", async (req, res, next) => {
  try {
    //   const products = await Product.findAll();
    const options = {
      attributes: ["id", "name", "image", "price"],
      page: 1, // Default 1
      paginate: 25, // Default 25
      order: [["name", "DESC"]],
      // where: { name: { [Op.like]: req.query ? `%${req.query.name}%` : !null } },
    };
    const { docs, pages, total } = await Product.paginate(options);
    res.status(200).send({ docs, pages, total });
  } catch (err) {
    console.log(err);
  }
});

productRouter.post("/", async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(200).send({ newProduct });
  } catch (err) {
    console.log(err);
  }
});
productRouter.post(
  "/:id/upload",
  parser.single("image"),
  async (req, res, next) => {
    try {
      const image = req.file && req.file.path; // add the single
      console.log(image);
      console.log(req.params.id);
      const updatedProduct = await Product.update(
        { image },
        { returning: true, where: { id: req.params.id } }
      );
      res.status(200).send({ updatedProduct });
    } catch (err) {
      console.log(err);
    }
  }
);

productRouter.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const productUpdate = await Product.update(req.body, {
      returning: true,
      plain: true,
      where: {
        id,
      },
    });
    res.status(200).send({ productUpdate });
  } catch (err) {
    console.log(err);
  }
});

productRouter.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const productToDestroy = await Product.destroy({ where: { id } });
    res.status(200).send({ productToDestroy });
  } catch (err) {
    console.log(err);
  }
});
module.exports = productRouter;
