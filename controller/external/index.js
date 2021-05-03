const express = require("express");
const SearchController = require("./search");

const ExternalApiRouter = express.Router();

ExternalApiRouter.get("/", SearchController);

module.exports = ExternalApiRouter;
