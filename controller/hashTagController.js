const Post = require("../models/post");
const HashTag = require("../models/hashtag");

const moment = require("moment");

module.exports.recalibrate = async (req, res) => {
  try {
    const today = moment();
    const yesterday = moment(today).subtract(2, "hours");

    console.log("started ", today, yesterday);

    // to find new posts created in the last 2 hours
    let posts = await Post.find({
      createdAt: {
        $gte: yesterday.toDate(),
        $lte: today.toDate(),
      },
    });

    posts = posts
    .filter(({ content }) => content && content.length > 0)
    .map(({ content }) => {
      return content;
    });

    if (posts.length == 0) {
      return res.status(200).json({
        date: {
          message: `No new posts created btw ${yesterday} and ${today} `,
        },
      });
    }


    for(let post of posts) {
        const content = post.content;
        console.log("recalibrate", content);
    }
    


    return res.status(200).json({
        data: {
          count: games.length,
          responseData,
        },
      });
    

  } catch (err) {
    let message = `Error in recalibrating hashtags ${err}`;
    console.log(message);
    return res.status(500).json({
      message,
    });
  }
};
