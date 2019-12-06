# alipay-mini-program-open-api-request-options
> 基于[Easy Open Api服务器开发框架](https://gitee.com/durcframework/easyopen)以及[alipay-mini-program-request-options](https://www.npmjs.com/package/alipay-mini-program-request-options)包的请求拓展
<br>

## [alipay-mini-program-request-options](https://www.npmjs.com/package/alipay-mini-program-request-options)
> 基于[支付宝小程序请求Api](https://docs.alipay.com/mini/api/owycmh)的二次封装
<br>

## NPM
[
![NPM version](https://img.shields.io/npm/v/alipay-mini-program-open-api-request-options.svg)
![NPM download](https://img.shields.io/npm/dm/alipay-mini-program-open-api-request-options.svg)
![NPM download](https://img.shields.io/npm/dw/alipay-mini-program-open-api-request-options.svg)
](https://www.npmjs.com/package/alipay-mini-program-open-api-request-options)

## Usage
```js
const OpenApi = require('alipay-mini-program-open-api-request-options')
// 默认配置
const defaultConfig = {
  version: '1.0',
  app_key: 'test',
  format: 'json',
  app_secret: '123456',
  url: `请求链接URL`
}
// 创建实例
const openApiInstance = new OpenApi(defaultConfig)
// 添加默认配置
openApiInstance.setConfig(defaultConfig)
// 创建请求实例
openApiInstance.newOptions()
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

