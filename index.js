'use strict'

const loaderUtils = require('loader-utils')

function transformLine(customLoader, line) {
  const replaceString = customLoader && customLoader.loader ? `${customLoader.loader}!$1` : '$1'
  return line.replace(/\/\/\= require (.*)/, `require("${replaceString}");`)
}

module.exports = function(source) {
  const lines = source.split('\n')

  const customLoader = typeof this.query !== 'undefined' ? loaderUtils.parseQuery(this.query) : null

  return lines.map(line => transformLine(customLoader, line)).join('\n')
}
