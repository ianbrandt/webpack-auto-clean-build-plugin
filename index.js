/*
 * Copyright (c) (2017) - Aikar
 *
 *  http://aikar.co
 *
 *  @license MIT
 *
 */

'use strict'

/**
 * @constructor
 */
function WebpackAutoCleanBuildPlugin () { }

// noinspection JSUnusedGlobalSymbols
WebpackAutoCleanBuildPlugin.prototype.apply = function (compiler) {
  compiler.plugin('after-emit', function (compilation, callback) {
    for (let filename in compilation.assets) {
      console.log('[debug] ' + filename)
    }
    callback()
  })
}

module.exports = WebpackAutoCleanBuildPlugin
