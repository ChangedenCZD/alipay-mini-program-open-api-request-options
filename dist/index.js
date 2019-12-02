'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var md5 = require('md5');

var _require = require('alipay-mini-program-request-options'),
    Options = _require.Options;

var dateformat = require('dateformat');
var DEFAULT_CONFIG = {};
var getDefaultBody = function getDefaultBody(name, data) {
  var version = DEFAULT_CONFIG.version,
      app_key = DEFAULT_CONFIG.app_key,
      format = DEFAULT_CONFIG.format;

  var config = {
    version: version,
    app_key: app_key,
    format: format,
    timestamp: dateformat(new Date(), 'yyyy-mm-dd HH:MM:ss')
  };
  if (name) {
    config['name'] = name;
  }
  if (data) {
    config['data'] = encodeURIComponent(JSON.stringify(data));
  }
  return config;
};
var setConfig = function setConfig(config) {
  if (config) {
    Object.keys(config).forEach(function (key) {
      DEFAULT_CONFIG[key] = config[key];
    });
  }
};
var buildSign = function buildSign(postData, secret) {
  var paramNames = [];
  for (var key in postData) {
    paramNames.push(key);
  }
  paramNames.sort();
  var paramNameValue = [];
  for (var i = 0; i < paramNames.length; i++) {
    var paramName = paramNames[i];
    paramNameValue.push(paramName);
    paramNameValue.push(postData[paramName]);
  }
  var source = secret + paramNameValue.join('') + secret;

  return md5(source).toUpperCase();
};
var genSignature = function genSignature(name, data) {
  var signBody = getDefaultBody(name, data);
  signBody.sign = buildSign(signBody, DEFAULT_CONFIG['app_secret']);
  return signBody;
};

var OpenApiOptions = function () {
  function OpenApiOptions(name) {
    _classCallCheck(this, OpenApiOptions);

    this.url = DEFAULT_CONFIG['url'];
    this.name = name;
    this.method = 'POST';
    this.headers = {};
    this.data = {};
    this.timeout = 60000;
  }

  _createClass(OpenApiOptions, [{
    key: 'setUrl',
    value: function setUrl(url) {
      this.url = url;
      return this;
    }
  }, {
    key: 'setName',
    value: function setName(name) {
      this.name = name || '';
      return this;
    }
  }, {
    key: 'setMethod',
    value: function setMethod(method) {
      this.method = method || DEFAULT_METHOD;
      return this;
    }
  }, {
    key: 'setData',
    value: function setData(data) {
      this.data = data || {};
      return this;
    }
  }, {
    key: 'setHeaders',
    value: function setHeaders(headers) {
      this.headers = headers || {};
      return this;
    }
  }, {
    key: 'setTimeout',
    value: function setTimeout(timeout) {
      this.timeout = timeout;
      return this;
    }
  }, {
    key: 'request',
    value: function request(complete) {
      var url = this.url,
          method = this.method,
          headers = this.headers,
          data = this.data,
          name = this.name,
          timeout = this.timeout;

      console.log(url, method, headers, data, name);
      return new Options(url).setMethod(method).setHeaders(headers).setTimeout(timeout).setData(genSignature(name, data)).request(complete);
    }
  }]);

  return OpenApiOptions;
}();

module.exports = {
  setConfig: setConfig, OpenApiOptions: OpenApiOptions
};
