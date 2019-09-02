/**
 * advertiser info login
 *
 * @url /api/v1/i18n/advertiser/info/
 * @param id
 */

module.exports = function (req, res, next) {
  const rt = {
    body: {
      staff_id: 7722328,
      can_visit_advertiser: true,
      is_agent: false,
      telephone: '33542333243r',
      contacter: '张建奇',
      phonenumber: '15608059720',
      timezone: 'Etc/GMT-8',
      id: '72391499277',
      visitor_info: {},
      role: 3,
      is_majordomo: false,
      status: 4,
      description: '122313214444',
      company: '国际国际国际',
      ref_role: 0,
      is_admin: true,
      func_white: false,
      ocpm_white: false,
      can_visit_agent: false,
      name: '国际化管理员',
      login_info: {
        status: '4',
        description: '122313214444',
        country: 'CN',
        company: '国际国际国际',
        license_no: '1321315455234',
        telephone: '33542333243r',
        id: '72391499277',
        contacter: '张建奇',
        phonenumber: '15608059720',
        timezone: 'Etc/GMT-8',
        license_url:
          '//ads.tiktok.com/advertiser/advertiser_photo/?public_key=2OafnglKy7iY2Q7IVo71DpPJKMt6oGtEMRCYV24dn9B2ssBC%2FYC4z%2FoJ9FDTl0uQZp9X%2BNwb8gPYCBIXAyRzow%3D%3D',
        role: '3',
        email: 'int@i18n.com',
        name: '国际化管理员',
      },
      country: 'CN',
      license_no: '1321315455234',
      email: 'int@i18n.com',
      license_url:
        '//ads.tiktok.com/advertiser/advertiser_photo/?public_key=2OafnglKy7iY2Q7IVo71DpPJKMt6oGtEMRCYV24dn9B2ssBC%2FYC4z%2FoJ9FDTl0uQZp9X%2BNwb8gPYCBIXAyRzow%3D%3D',
    },
    status: 1,
    msg: '成功',
  };
  return rt;
};
