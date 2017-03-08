/* eslint-env mocha */

import chai, {expect} from 'chai'
import dirtyChai from 'dirty-chai'
import fse from 'fs-extra'
import path from 'path'
import webpack from 'webpack'
import AutoCleanBuildPlugin from '../dist/index'

chai.use(dirtyChai)

const OUTPUT_DIR = path.join(__dirname, '../test_output')
const FIXTURES_DIR = path.join(__dirname, '../test_fixtures')

describe('AutoCleanBuildPlugin', function () {
  beforeEach((done) => {
    fse.removeSync(OUTPUT_DIR)
    fse.mkdirsSync(OUTPUT_DIR)
    done()
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
      new AutoCleanBuildPlugin()
    ]
  }

  function nominalAssertions () {
    const files = fse.readdirSync(OUTPUT_DIR)
    expect(files).to.have.lengthOf(1)
    expect(files[0]).to.match(/^main-.*\.js/)
  }

  it('invokes without error', (done) => {
    assertWithWebpack(done, nominalWebpackConfig, nominalAssertions)
  })

  it('should remove old hashed files', (done) => {
    // TODO: Implement!
    // fse.copySync(path.join(FIXTURES_DIR, 'main-oldhash.js'), path.join(OUTPUT_DIR, 'main-oldhash.js'))
    assertWithWebpack(done, nominalWebpackConfig, nominalAssertions)
  })
})
