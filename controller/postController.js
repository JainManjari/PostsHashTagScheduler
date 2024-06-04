const Post = require("../models/post");

module.exports.createPost = async (req, res) => {
  try {
    let content = req.body.content;
    if (content === null || content === undefined || content.length <= 0) {
      return res.status(400).json({
        message: `Content is invalid ${content}`,
      });
    }
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

module.exports.getAllPosts = async (req, res) => {
  try {
    let posts = await Post.find({}).sort({ createdAt: -1 });
    posts = posts
      .filter(({ content }) => content && content.length > 0)
      .map(({ content }) => {
        return content;
      });
    return res.status(200).json({
      data: {
        posts,
      },
    });
  } catch (err) {
    let message = `Error in getting all posts ${err}`;
    console.log(message);
    return res.status(500).json({
      message,
    });
  }
};
