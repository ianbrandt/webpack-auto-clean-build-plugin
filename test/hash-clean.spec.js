/* eslint-env mocha */

import chai, {expect} from 'chai'
import dirtyChai from 'dirty-chai'
import fse from 'fs-extra'
import path from 'path'
import webpack from 'webpack'
import HashCleanWebpackPlugin from '../dist/hash-clean.js'

chai.use(dirtyChai)

const OUTPUT_DIR = path.join(__dirname, '../test_output')
const FIXTURES_DIR = path.join(__dirname, '../test_fixtures')

describe('HashCleanWebpackPlugin', function () {
  describe('#apply(compiler)', function () {
    beforeEach(function (done) {
      fse.removeSync(OUTPUT_DIR)
      fse.mkdirsSync(OUTPUT_DIR)
      done()
    })

    it('invokes without error', function (done) {
      assertWithWebpack(done, nominalWebpackConfig, nominalAssertions)
    })

    it('should remove old hashed files', function (done) {
      // TODO: Implement!
      // fse.copySync(path.join(FIXTURES_DIR, 'main-oldhash.js'), path.join(OUTPUT_DIR, 'main-oldhash.js'))
      assertWithWebpack(done, nominalWebpackConfig, nominalAssertions)
    })
  })

  function assertWithWebpack (done, webpackConfig, assertions) {
    webpack(webpackConfig, (err, stats) => {
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

  const nominalWebpackConfig = {
    entry: path.join(FIXTURES_DIR, 'main.js'),
    output: {
      path: OUTPUT_DIR,
      filename: '[name]-[chunkhash].js'
    },
    plugins: [
      new HashCleanWebpackPlugin()
    ]
  }

  function nominalAssertions () {
    const files = fse.readdirSync(OUTPUT_DIR)
    expect(files).to.have.lengthOf(1)
    expect(files[0]).to.match(/^main-.*\.js/)
  }
})
