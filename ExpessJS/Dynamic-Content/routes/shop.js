const path = require("path");

const express = require("express");

const rootDir = require("../util/path");

const adminRoute = require("./admin");

const router = express.Router();

router.get("/", (req, res, next) => {
  console.log("product data :::", adminRoute.product);

  res.sendFile(path.join(rootDir, "views", "shop.html"));
});

module.exports = router;
