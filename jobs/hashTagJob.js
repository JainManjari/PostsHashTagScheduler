const cron = require("node-cron");
const axios = require("axios");

module.exports.hashTagRecalibrate = async () => {
  try {
    cron.schedule("0 */1 * * * *", async () => {
      console.log("starting scheduler");
      axios
        .get("http://localhost:8000/hashtags/recalibrate")
        .then((response) => {
          console.log("hashtag job response ", JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log("Error in scheduler of hashTagRecalibrate Job ", error);
        });
    });
  } catch (err) {
    console.log("Error in hashTagRecalibrate Job", err);
  }
};
