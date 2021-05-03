const express = require("express");
const ProductRouter = require("./product/index");
const ExternalApiRouter = require("./external/index");

const ApiRouter = express.Router();

ApiRouter.use("/product", ProductRouter);
ApiRouter.use("/external", ExternalApiRouter);

module.exports = ApiRouter;
