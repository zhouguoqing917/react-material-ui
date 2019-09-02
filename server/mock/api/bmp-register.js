/**
 * bpm register
 *
 * @url /api/v1/i18n/bpm/register/
 * @method POST
 *
 */

module.exports = function (req, res) {
  if (/post/i.test(req.method)) {
    return {
      'code|1': [0, 0, 0, 0, 1], // simulation error code, 1/5 probability of error code 1.
      'data': {
        'list|2': [
          {
            'title': '@title',
            'info': '@sentence(3, 5)',
            'link': '@url'
          }
        ]
      }
    };
  } else {
    return {
      body: {
        second_industry_id: 109,
        sub_name: 'asda222222sd',
        agent_industry_ids: [54],
        agent_industry_strings: [54],
        company: '公司名称aaa',
        small_industry_id: 109,
        id: null,
        BaseResp: {
          StatusMessage: '',
          StatusCode: 0,
        },
        name: '改改公司名称aaa',
        email: 'abc@xx.com',
        description: 'https://www.toutiao.com',
        industry_id: 54,
        license_no: 'asdsada',
        second_industry_string: '电脑配件',
        marketing_area_id_string: 'CN',
        industry_string: '电脑硬件办公',
        scope: 101,
        customer_id: null,
        type: 101,
        license_address_id_string: 'CN',
      },
      status: 1,
      msg: '成功',
    };
  }

}
