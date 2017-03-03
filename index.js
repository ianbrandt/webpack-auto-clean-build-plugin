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
function WebpackAutoCleanBuildPlugin() {

}

WebpackAutoCleanBuildPlugin.prototype.apply = function (compiler) {

	compiler.plugin('emit', function (compilation, callback) {

		console.log("WebpackAutoCleanBuildPlugin invoked!");

		callback();

	}.bind(this));
};

module.exports = WebpackAutoCleanBuildPlugin;
