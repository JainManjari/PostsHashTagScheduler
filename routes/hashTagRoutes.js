const express = require("express");
const router = express.Router();
const hashTagController = require('../controller/hashTagController')

console.log("hashtag router loaded");

router.get("/recalibrate", hashTagController.recalibrate);
router.get("/top", hashTagController.getTopHashTags);

module.exports = router;