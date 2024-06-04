const mongoose = require("mongoose");

const hashtagSchema = new mongoose.Schema(
  {
    keyword: {
      type: String,
      required: true,
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        // autopopulate:true
      },
    ],
  },
  {
    timestamps: true,
  }
);

const HashTag = mongoose.model("hashtag", hashtagSchema);
module.exports = HashTag;
