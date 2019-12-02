const md5 = require('md5')
const { Options } = require('alipay-mini-program-request-options')
const dateformat = require('dateformat')
const DEFAULT_CONFIG = {}
const getDefaultBody = (name, data) => {
  const { version, app_key, format } = DEFAULT_CONFIG
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
const setConfig = config => {
  if (config) {
    Object.keys(config).forEach(key => {
      DEFAULT_CONFIG[key] = config[key]
    })
  }
}
const buildSign = (postData, secret) => {
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
  let source = secret + paramNameValue.join('') + secret

  return md5(source).toUpperCase()
}
const genSignature = (name, data) => {
  const signBody = getDefaultBody(name, data)
  signBody.sign = buildSign(signBody, DEFAULT_CONFIG['app_secret'])
  return signBody
}

class OpenApiOptions {
  constructor (name) {
    this.url = DEFAULT_CONFIG['url']
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
    this.method = method || DEFAULT_METHOD
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

module.exports = {
  setConfig, OpenApiOptions
}
