'use strict'

const loaderUtils = require('loader-utils')

function transformLine(queryOptions, line) {
  const replaceString = queryOptions && queryOptions.relative ? `./$1` : '$1'
  return line.replace(/\/\/\= require (.*)/, `require("${replaceString}");`)
}

module.exports = function(source) {
  const lines = source.split('\n')

  const queryOptions = typeof this.query !== 'undefined' ? loaderUtils.parseQuery(this.query) : null

  return lines.map(line => transformLine(queryOptions, line)).join('\n')
}
