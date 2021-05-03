const express = require("express");
const GetProductController = require("./getproduct");
const ListProductController = require("./listproduct");

const ProductRouter = express.Router();

ProductRouter.get("/", GetProductController);
ProductRouter.get("/list", ListProductController);

module.exports = ProductRouter;
