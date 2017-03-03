/*
 * Copyright (c) (2017) - Aikar
 *
 *  http://aikar.co
 *
 *  @license MIT
 *
 */

/**
 * @constructor
 */
function WebpackAutoCleanBuildPlugin () { }

// noinspection JSUnusedGlobalSymbols
WebpackAutoCleanBuildPlugin.prototype.apply = function (compiler) {
  compiler.plugin('emit', function (compilation, callback) {
    console.log('[debug] AutoCleanBuildPlugin invoked!')
    callback()
  })
}

module.exports = WebpackAutoCleanBuildPlugin
