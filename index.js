'use strict'

function transformLine(line) {
  return line.replace(/\/\/\=require (.*)/, 'require("$1");')
}

module.exports = function(source) {
  const lines = source.split('\n')

  return lines.map(transformLine).join('\n')
}
