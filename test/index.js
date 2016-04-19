'use strict'

const expect = require('chai').expect
const queryString = require('querystring')

const loader = require('../index')

describe('loader', function() {
  it('transforms requires', function() {
    const context = {}
    const result = loader.call(context, 'line1;\n//= require foo/bar\nline2')

    expect(result).to.eq('line1;\nrequire("foo/bar");\nline2')
  })

  it('allows forcing a relative path', function() {
    const context = {
      query: '?'+queryString.stringify({relative: true})
    }
    const result = loader.call(context, 'line1;\n//= require foo/bar\nline2')

    expect(result).to.eq('line1;\nrequire("./foo/bar");\nline2')
  })

  it('ignores other query parameters', function() {
    const context = {
      query: '?'+queryString.stringify({bah: 'foobar'})
    }
    const result = loader.call(context, 'line1;\n//= require foo/bar\nline2')

    expect(result).to.eq('line1;\nrequire("foo/bar");\nline2')
  })
})
