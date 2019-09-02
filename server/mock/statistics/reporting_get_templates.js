

/**
 * api v2 reporting get_templates
 *
 * @url api/v2/i18n/statistics/reporting/get_templates/
 *
 * @param id:1
 */


module.exports = function (req,res, next) {
  return {
    code: 0,
    "data": {
      "list": [{
        "id": 1,
        "name": "tom's report1",
        "content": {},
        "create_time": 1552567465,
        "last_time": 1552568576,
        "creator": "mockTest@bytedance.com",
        "frequency": 1,
       },
        {
          "id": 2,
          "name": "tom's report2",
          "content": {},
          "create_time": 1552567465,
          "last_time": 1552568576,
          "creator": "mockTest@bytedance.com",
          "frequency": 2,
        },
        {
          "id": 3,
          "name": "tom's report3",
          "content": {},
          "create_time": 1552567465,
          "last_time": 1552568576,
          "creator": "mockTest@bytedance.com",
          "frequency": 3,
        },
        {
          "id": 4,
          "name": "tom's report4",
          "content": {},
          "create_time": 1552567465,
          "last_time": 1552568576,
          "creator": "mockTest@bytedance.com",
          "frequency": 4,
        },
        {
          "id": 5,
          "name": "tom's report5",
          "content": {},
          "create_time": 1552567465,
          "last_time": 1552568576,
          "creator": "mockTest@bytedance.com",
          "frequency": 1,
        },
        {
          "id": 6,
          "name": "tom's report6",
          "content": {},
          "create_time": 1552567465,
          "last_time": 1552568576,
          "creator": "mockTest@bytedance.com",
          "frequency": 2,
        },
        {
          "id": 7,
          "name": "tom's report7",
          "content": {},
          "create_time": 1552567465,
          "last_time": 1552568576,
          "creator": "mockTest@bytedance.com",
          "frequency": 3,
        },
        {
          "id": 8,
          "name": "tom's report8",
          "content": {},
          "create_time": 1552567465,
          "last_time": 1552568576,
          "creator": "mockTest@bytedance.com",
          "frequency": 4,
        },
        {
          "id": 9,
          "name": "tom's report9",
          "content": {},
          "create_time": 1552567465,
          "last_time": 1552568576,
          "creator": "mockTest@bytedance.com",
          "frequency": 3,
        },
        {
          "id": 10,
          "name": "tom's report10",
          "content": {},
          "create_time": 1552567465,
          "last_time": 1552568576,
          "creator": "mockTest@bytedance.com",
          "frequency": 4,
        },
      ],
      "pagination":{
        "limit": 20,
        "page": 1,
        "page_count": 3,
        "total_count": 51,
      }
    },
    "msg": "成功"
  };
};

