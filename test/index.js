'use strict'

const expect = require('chai').expect
const loader = require('../index')

describe('loader', function() {
  it('transforms requires', function() {
    const result = loader('line1;\n//=require foo/bar\nline2')

    expect(result).to.eq('line1;\nrequire("foo/bar");\nline2')
  })
})
