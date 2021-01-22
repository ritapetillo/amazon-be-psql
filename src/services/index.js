const express = require("express");
const router = express.Router();
const productRoutes = require('./products')
const cartRoutes = require("./cart");
const userRoutes = require("./users");
const categoryRoutes = require("./categories");
const reviewRoutes = require("./reviews");


router.use('/products', productRoutes)
router.use("/users", userRoutes);
router.use("/cart", cartRoutes);
router.use("/categories", categoryRoutes);
router.use("/reviews", reviewRoutes);



module.exports = router;
