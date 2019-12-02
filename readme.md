# alipay-mini-program-open-api-request-options
> 基于[Easy Open Api服务器开发框架](https://gitee.com/durcframework/easyopen)以及[alipay-mini-program-request-options](https://www.npmjs.com/package/alipay-mini-program-request-options)包的请求拓展
<br>

## [alipay-mini-program-request-options](https://www.npmjs.com/package/alipay-mini-program-request-options)
> 基于[支付宝小程序请求Api](https://docs.alipay.com/mini/api/owycmh)的二次封装
<br>

## Usage
```js
const { setConfig, OpenApiOptions } = require('alipay-mini-program-open-api-request-options')
// 添加默认配置
setConfig({
  version: '1.0',
  app_key: 'test',
  format: 'json',
  app_secret: '123456',
  url: `请求链接URL`
})
// 创建请求实例
new OpenApiOptions()
  .setName('apiName')
  .setData({
    keyword: 'test'
  })
  .setHeaders({
    'content-type': 'application/json;charset=UTF-8'
  })
  .setTimeout(60000)
  .request(function () {
    console.log('completed');
  })
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.error(err);
  });
```

### Methods
|Name|Param name array|Param type array|Return|
| ------ | ------ | ------ | --- |
| setUrl | [url] | [String] | this |
| setMethod | [method] | [String] | this |
| setHeaders | [headers] | [Object] | this |
| setTimeout | [timeout] | [Integer] | this |
| setData | [data] | [Object] | this |
| request | [completeCallback] | [Function] | Promise |

