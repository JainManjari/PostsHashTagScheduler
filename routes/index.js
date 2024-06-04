const express = require("express");
const router = express.Router();
const homeController = require('../controller/homeController')

console.log("router loaded");

router.get("/", homeController.homePage);
router.use("/posts", require("./postRoutes"));
router.use("/hashtags", require("./hashTagRoutes"));

module.exports = router;
