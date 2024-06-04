const Post = require("../models/post");

module.exports.createPost = async (req, res) => {
  try {
    let content = req.body.content;
    let post = await Post.create({ content });
    return res.status(200).json({
      message: `Post successfully created with content ${content}`,
    });
  } catch (err) {
    let message = `Error in creating post ${err}`;
    console.log(message);
    return res.status(500).json({
      message,
    });
  }
};
