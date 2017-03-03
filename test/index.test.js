/* eslint-env mocha */

'use strict'

var chai = require('chai')
var dirtyChai = require('dirty-chai')
var expect = require('chai').expect
var fse = require('fs-extra')
var path = require('path')
var webpack = require('webpack')

var AutoCleanBuildPlugin = require('../index.js')

var OUTPUT_DIR = path.join(__dirname, '../tmp')

chai.use(dirtyChai)

describe('AutoCleanBuildPlugin', function () {
  beforeEach(function (done) {
    fse.removeSync(OUTPUT_DIR)
    done()
  })

  it('invokes without error', function (done) {
    var webpackConfig = {
      entry: path.join(__dirname, 'fixtures/main.js'),
      output: {
        path: OUTPUT_DIR,
        filename: '[name]-[chunkhash].js'
      },
      plugins: [
        new AutoCleanBuildPlugin()
      ]
    }

    fse.mkdirsSync(OUTPUT_DIR)

    webpack(webpackConfig, function (err, stats) {
      expect(err).to.be.null()

      expect(stats.hasErrors()).to.be.false()

      fse.readdir(OUTPUT_DIR, function (err, files) {
        expect(err).to.be.null()

        expect(files).to.have.lengthOf(1)

        expect(files[0]).to.match(/^main-.*\.js/)
      })

      done()
    })
  })
})
