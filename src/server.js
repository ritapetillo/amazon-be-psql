const express = require("express");
const server = express();
const cors = require("cors");
const error_handler = require("node-error-handler");
const PORT = process.env.PORT || 3001;
const db = require("./utils/db/index");
const apiRoutes = require("./services");

server.use(express.json());
server.use(cors());

server.use("/api", apiRoutes);

server.use(error_handler({ log: true, debug: true }));

db.sequelize
  .sync({ force: false })
  .then(() => server.listen(PORT, () => console.log("connected to " + PORT)));
