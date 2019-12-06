const md5 = require('md5')
const { Options, Methods } = require('alipay-mini-program-request-options')
const dateformat = require('dateformat')

const getDefaultBody = (ctx, name, data) => {
  const { version, app_key, format } = ctx.DEFAULT_CONFIG
  const config = {
    version,
    app_key,
    format,
    timestamp: dateformat(new Date(), 'yyyy-mm-dd HH:MM:ss')
  }
  if (name) {
    config['name'] = name
  }
  if (data) {
    config['data'] = encodeURIComponent(JSON.stringify(data))
  }
  return config
}
const buildSign = (ctx, postData, secret) => {
  let paramNames = []
  for (let key in postData) {
    paramNames.push(key)
  }
  paramNames.sort()
  let paramNameValue = []
  for (let i = 0; i < paramNames.length; i++) {
    let paramName = paramNames[i]
    paramNameValue.push(paramName)
    paramNameValue.push(postData[paramName])
  }
  return md5(secret + paramNameValue.join('') + secret).toUpperCase()
}
const genSignature = (ctx, name, data) => {
  const signBody = getDefaultBody(ctx, name, data)
  signBody.sign = buildSign(ctx, signBody, ctx.DEFAULT_CONFIG['app_secret'])
  return signBody
}

class OpenApiOptions {
  constructor (ctx, name) {
    this.url = ctx.DEFAULT_CONFIG['url']
    this.name = name
    this.method = 'POST'
    this.headers = {}
    this.data = {}
    this.timeout = 60000
  }

  setUrl (url) {
    this.url = url
    return this
  }

  setName (name) {
    this.name = name || ''
    return this
  }

  setMethod (method) {
    this.method = method || Methods['GET']
    return this
  }

  setData (data) {
    this.data = data || {}
    return this
  }

  setHeaders (headers) {
    this.headers = headers || {}
    return this
  }

  setTimeout (timeout) {
    this.timeout = timeout
    return this
  }

  request (complete) {
    const { url, method, headers, data, name, timeout } = this
    console.log(url, method, headers, data, name)
    return new Options(url)
    .setMethod(method)
    .setHeaders(headers)
    .setTimeout(timeout)
    .setData(genSignature(name, data))
    .request(complete)
  }
}

module.exports = class OpenApi {
  constructor (defaultConfig) {
    this.DEFAULT_CONFIG = {}
    if (typeof defaultConfig === 'object') {
      this.setConfig(defaultConfig)
    }
  }

  setConfig (config) {
    if (config) {
      Object.keys(config).forEach(key => {
        this.DEFAULT_CONFIG[key] = config[key]
      })
    }
  }

  newOptions (name) {
    return new OpenApiOptions(this, name)
  }
}
