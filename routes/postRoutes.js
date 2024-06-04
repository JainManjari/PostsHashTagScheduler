const express = require("express");
const router = express.Router();
const postController = require("../controller/postController");

console.log("post router loaded");

router.post("/", postController.createPost);
router.get("/all", postController.getAllPosts);

module.exports = router;
