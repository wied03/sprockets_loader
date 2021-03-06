'use strict'

const loaderUtils = require('loader-utils')

function transformLine(queryOptions, line) {
  let replaceString = '$1'
  if (queryOptions) {
    if (queryOptions.relative) {
      replaceString = './$1'
    }
    if (queryOptions.loader) {
      replaceString = `${queryOptions.loader}!${replaceString}`
    }
  }
  return line.replace(/\/\/\= require (.*)/, `require("${replaceString}");`)
}

module.exports = function(source) {
  const lines = source.split('\n')

  const queryOptions = typeof this.query !== 'undefined' ? loaderUtils.parseQuery(this.query) : null

  return lines.map(line => transformLine(queryOptions, line)).join('\n')
}
