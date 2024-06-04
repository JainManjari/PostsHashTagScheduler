const Post = require("../models/post");
const HashTag = require("../models/hashtag");

const moment = require("moment");

const getHashTagArray = (content) => {
  const hashtags = content.split(" ").filter((v) => v.startsWith("#"));
  let hashtagArray = [];
  for (let hashtag of hashtags) {
    let hashTagKeys = hashtag.split("#");
    for (let hashTagKey of hashTagKeys) {
      if (hashTagKey.length > 0) {
        hashtagArray.push(hashTagKey);
      }
    }
  }

  return hashtagArray;
};

const upsertHashTagArray = async (postId, hashtagArray) => {
  try {
    console.log("postId ", postId, hashtagArray);
    for (let hashTag of hashtagArray) {
      let hashTagModel = await HashTag.findOne({
        keyword: hashTag,
      });

      if (!hashTagModel) {
        hashTagModel = await HashTag.create({
          keyword: hashTag,
          posts: [postId],
        });
      }

      if (!hashTagModel.posts.includes(postId)) {
        hashTagModel.posts.push(postId);
      }

      const newvalues = { $set: { posts: hashTagModel.posts } };
      hashTagModel = await HashTag.updateOne({ keyword: hashTag }, newvalues);
    }
  } catch (err) {
    console.log("error in updating hashtag ", err);
    throw err;
  }
};

module.exports.recalibrate = async (req, res) => {
  try {
    const endTime = moment();
    const startTime = moment(endTime).subtract(2, "hours");

    // to find new posts created in the last 2 hours
    let posts = await Post.find({
      createdAt: {
        $gte: startTime.toDate(),
        $lte: endTime.toDate(),
      },
    });

    posts = posts.filter(({ content }) => content && content.length > 0);

    if (posts.length == 0) {
      return res.status(200).json({
        date: {
          message: `No new posts created btw ${yesterday} and ${today} `,
        },
      });
    }

    for (let post of posts) {
      let hashtagArray = getHashTagArray(post.content);
      upsertHashTagArray(post.id, hashtagArray);
    }

    return res.status(200).json({
      message: `Successfully recalibrated of posts of length ${posts.length} between ${startTime} and ${endTime}`,
    });
  } catch (err) {
    let message = `Error in recalibrating hashtags ${err}`;
    console.log(message);
    return res.status(500).json({
      message,
    });
  }
};
