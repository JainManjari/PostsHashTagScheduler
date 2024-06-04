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
    count: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const HashTag = mongoose.model("HashTag", hashtagSchema);
module.exports = HashTag;
