/**
 * img_captcha
 *
 * @url /img_captcha/
 *
 * @param id:1
 */


module.exports = function (req,res) {
  return {
    "body": {
      "captcha_key": "4jAQHY3",
      "captcha_url": "//ads.tiktok.com/img_captcha/?ckey=4jAQHY3&channel=toutiao_ad"
    },
    "status": 1,
    "msg": "成功"
  };
};


