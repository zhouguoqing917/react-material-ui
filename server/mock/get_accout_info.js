/**
 * account get info
 *
 * @url /overture/account/get_info/
 *
 * @param id:1
 */
let c = {
  "msg": "\u6210\u529f",
  "code": 0,
  "data": {
    "u_province": "",
    "promotion_area": "",
    "self_type": 0,
    "check_type": 0,
    "avatar_status": 0,
    "submit_retry_times": 20,
    "telephone": "33542333243r",
    "contacter": "\u5f20\u5efa\u5947",
    "phonenumber": "15608059720",
    "self_service_confirm": null,
    "is_mp_user": false,
    "agree_pgc": null,
    "pgc_name": "",
    "license_city": "",
    "promotion_center_city": "",
    "brand": "",
    "avatar_reason": "",
    "role": 3,
    "brand_url": {},
    "email": "int@i18n.com",
    "public_auth_status": -1,
    "status": 4,
    "boss_name": "",
    "ocpm_as_default": false,
    "allow_modify": 0,
    "description": "122313214444",
    "is_self_service_user": true,
    "company": "\u56fd\u9645\u56fd\u9645\u56fd\u9645",
    "is_new": 0,
    "verify_retry_times": 3,
    "reason": "",
    "license_province": "",
    "avatar_info": {"hash": "dddc11ab25"},
    "show_public_auth": 1,
    "qualification_url": {},
    "name": "\u56fd\u9645\u5316\u7ba1\u7406\u5458",
    "auth_certificate": "",
    "industry": "",
    "license_no": "1321315455234",
    "is_mp_show": true,
    "license_url": "//ads.tiktok.com/advertiser/advertiser_photo/?public_key=MND3%2BxQ2bPcmjahSoR6B5GmQeOMKAS5B%2FtGjZqa%2Br10jKbWj6BZV%2B7iRH8VhxY0HZp9X%2BNwb8gPYCBIXAyRzow%3D%3D"
  }
};

module.exports = function (req,res) {
  return c;
};
