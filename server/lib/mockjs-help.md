

``` js
var path = require('path')
var express = require('express')
var mockjs = require('express-mockjs')

var app = express()

// 自定义路径 '/api'
app.use('/api', mockjs(path.join(__dirname, 'mocks')))

// 这里可以添加你的自定义代码.

app.listen(3000);
```

2. 在根目录下创建 `mocks` 目录，然后创建 `data.json` 内容如下:

### 例子
## data.json

`Mock JSON` 不是一个真正的 JSON 文件, 更像是 JS 文件, 所以你可以发挥你的想象了。

> 假设我们有个文件 'mocks/data.json' 内容为:

``` js
/**
 * 接口描述
 *
 * @url /test-api
 *
 * GET: 请求方法及参数
 *   uid 这是请求的用户ID
 *
 * 参数描述和其他说明。
 * uid: 用户ID
 * name: 用户名
 * email: 邮箱
 * 等等其他描述.
 */

{
  "code": 0,
  "result|5": [
    {
      "uid|+1": 1,
      "name": "@cname",
      "email": "@email"
    }
  ]
}
```

然后你可以访问 <http://localhost:3000/api/test-api> 查看实际效果.

当然，你也可以直接使用js文件书写。

``` js
/**
 * 首页 - 友情链接
 *
 * @url /home-links
 *
 * 在这里你可以写详细的说明参数的信息
 */

module.exports = {
  "code": function () { // 1/10 的概率返回错误码 1.
    return Math.random() < 0.1 ? 1 : 0;
  },
  "list|5-10": [
    {"title": "@title", "link": "@url"}
  ]
};
```

或者直绑定函数express route的函数：

``` js
/**
 * 用户页面 - 用户信息
 *
 * @url /user?uid=233
 *
 * GET: 请求方法及参数
 *   uid 这是请求的用户ID
 *
 * 在这里你可以写详细的说明参数的信息
 */

module.exports = function (req, res, next) {
  // express 的 req 对象
  var uid = req.query.uid;

  if (!uid) { // 当没有用户ID时返回错误信息
    return {
      code: -1,
      msg: 'no uid',
    }
  }

  return { // 返回mock的用户信息，但用户id固定
    code: 0,
    data: {
      "uid": +uid,
      "name": "@cname",
      "age|20-30": 1,
      "email": "@email",
      "date": "@date",
    },
  };
};
```
