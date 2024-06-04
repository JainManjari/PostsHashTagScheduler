const express = require("express");
const router = express.Router();
const homeController = require('../controller/homeController')

console.log("router loaded");

router.get("/", homeController.homePage);

module.exports = router;
