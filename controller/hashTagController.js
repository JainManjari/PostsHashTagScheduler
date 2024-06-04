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

const upsertHashTagArray = async (postId, hashtagArray, hashTagMap) => {
  try {
    for (let hashTag of hashtagArray) {
      hashTag = hashTag.toLowerCase().trim();
      let hashTagModel = hashTagMap[hashTag];

      if (!hashTagModel) {
        hashTagModel = await HashTag.findOne({
          keyword: hashTag,
        });
        if (!hashTagModel) {
          hashTagModel = await HashTag.create({
            keyword: hashTag,
            posts: [postId],
            count: 1,
          });
        }
        hashTagMap[hashTag] = hashTagModel;
        hashTagModel = hashTagMap[hashTag];
      }

      if (!hashTagModel.posts.includes(postId)) {
        hashTagModel.posts.push(postId);
        hashTagModel.count += 1;
        hashTagMap[hashTag] = hashTagModel;
      }
    }
    return hashTagMap;
  } catch (err) {
    console.log("error in updating hashtag ", err);
    throw err;
  }
};

module.exports.recalibrate = async (req, res) => {
  try {
    const endTime = moment();
    const startTime = moment(endTime).subtract(4, "hours");

    // to find new posts created in the last 4 hours
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
    let hashTagMap = {};
    for (let post of posts) {
      let hashtagArray = getHashTagArray(post.content);
      let postId = post.id.toString();

      for (let hashTag of hashtagArray) {
        hashTag = hashTag.toLowerCase().trim().toString();
        let hashTagModel = hashTagMap[hashTag];

        if (!hashTagModel) {
          hashTagModel = await HashTag.findOne({
            keyword: hashTag,
          });
          if (!hashTagModel) {
            hashTagModel = await HashTag.create({
              keyword: hashTag,
              posts: [postId],
              count: 1,
            });
          }
          hashTagMap[hashTag] = hashTagModel;
          hashTagModel = hashTagMap[hashTag];
        }

        if (!hashTagModel.posts.includes(postId)) {
          hashTagModel.posts.push(postId);
          hashTagModel.count += 1;
          hashTagMap[hashTag] = hashTagModel;
        }
      }
    }

    const hashTags = [];
    for (let hashTag in hashTagMap) {
      hashTags.push(hashTagMap[hashTag]);
    }

    const bulkOps = hashTags.map((obj) => {
      return {
        updateOne: {
          filter: {
            _id: obj._id,
          },
          update: {
            posts: obj.posts,
            count: obj.count,
          },
        },
      };
    });

    await HashTag.bulkWrite(bulkOps);

    let responseData = [];

    for (let hashTag of hashTags) {
      let hashTagObj = {};
      hashTagObj.keyword = hashTag.keyword;
      hashTagObj.count = hashTag.count;
      responseData.push(hashTagObj);
    }

    return res.status(200).json({
      message: `Successfully recalibrated of posts of length ${posts.length} between ${startTime} and ${endTime}`,
      data: responseData,
    });
  } catch (err) {
    let message = `Error in recalibrating hashtags ${err}`;
    console.log(message);
    return res.status(500).json({
      message,
    });
  }
};

module.exports.getTopHashTags = async (req, res) => {
  try {
    let limit = req.query.limit;
    if (isNaN(limit)) {
      limit = 5;
    }
    if (limit <= 0) {
      return res.status(400).json({
        data: {
          message: "Enter valid limit.",
        },
      });
    }
    let hashtags = await HashTag.find({})
      .populate("posts")
      .sort({ count: -1 })
      .limit(limit);

    let hashTagsData = hashtags.map((hashtag) => {
      let posts = hashtag.posts.map((post) => post.content);
      return { keyword: hashtag.keyword, count: hashtag.count, posts: posts };
    });

    return res.status(200).json({
      data: {
        hashTagsData,
      },
    });
  } catch (err) {
    let message = `Error in getting top hashtags ${err}`;
    console.log(message);
    return res.status(500).json({
      message,
    });
  }
};

module.exports.searchByHashTag = async (req, res) => {
  try {
    let searchTerm = req.query.term;
    if (!searchTerm || searchTerm.length <= 1) {
      return res.status(400).json({
        data: {
          message: "Search Term is too small.",
        },
      });
    }

    console.log("searchTerm ", searchTerm);
    let hashtags = await HashTag.find({
      keyword: searchTerm,
    })
      .populate("posts")
      .sort({ count: -1 });

    let hashTagsData = hashtags.map((hashtag) => {
      let posts = hashtag.posts.map((post) => post.content);
      return { keyword: hashtag.keyword, count: hashtag.count, posts: posts };
    });

    return res.status(200).json({
      data: {
        hashTagsData,
      },
    });
  } catch (err) {
    let message = `Error in searching a hashtags ${err}`;
    console.log(message);
    return res.status(500).json({
      message,
    });
  }
};
