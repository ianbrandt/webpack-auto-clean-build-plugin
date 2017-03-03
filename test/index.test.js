/* eslint-env mocha */

'use strict'

var chai = require('chai')
var dirtyChai = require('dirty-chai')
var expect = require('chai').expect
var fse = require('fs-extra')
var path = require('path')
var webpack = require('webpack')

chai.use(dirtyChai)

var AutoCleanBuildPlugin = require('../index.js')
var OUTPUT_DIR = path.join(__dirname, '../tmp')

describe('AutoCleanBuildPlugin', function () {
  beforeEach(function (done) {
    fse.removeSync(OUTPUT_DIR)
    fse.mkdirsSync(OUTPUT_DIR)
    done()
  })

  function assertWithWebpack (done, webpackConfig, assertions) {
    webpack(webpackConfig, function (err, stats) {
      try {
        expect(err).to.be.null()
        expect(stats.hasErrors()).to.be.false()
        assertions()
        done()
      } catch (e) {
        done(e)
      }
    })
  }

  var nominalWebpackConfig = {
    entry: path.join(__dirname, 'fixtures/main.js'),
    output: {
      path: OUTPUT_DIR,
      filename: '[name]-[chunkhash].js'
    },
    plugins: [
      new AutoCleanBuildPlugin()
    ]
  }

  function nominalAssertions () {
    var files = fse.readdirSync(OUTPUT_DIR)
    expect(files).to.have.lengthOf(1)
    expect(files[0]).to.match(/^main-.*\.js/)
  }

  it('invokes without error', function (done) {
    assertWithWebpack(done, nominalWebpackConfig, nominalAssertions)
  })

  it('should remove old hashed files', function (done) {
    // TODO: Implement!
    // fse.copySync('test/fixtures/main-oldhash.js', path.join(OUTPUT_DIR, 'main-oldhash.js'))
    assertWithWebpack(done, nominalWebpackConfig, nominalAssertions)
  })
})
