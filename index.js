/*
 * Copyright (c) (2017) - Aikar
 *
 *  http://aikar.co
 *
 *  @license MIT
 *
 */

var fs = require("fs");
var path = require("path");

/**
 * @constructor
 */
function WebpackAutoCleanBuildPlugin() {

}

WebpackAutoCleanBuildPlugin.prototype.apply = function (compiler) {

	compiler.plugin('emit', function(compilation, callback) {

		var changedChunks = compilation.chunks.filter(function(chunk) {

			var oldVersion = this.chunkVersions[chunk.name];

			this.chunkVersions[chunk.name] = chunk.hash;

			return chunk.hash !== oldVersion;

		}.bind(this));

		callback();

	}.bind(this));
};

module.exports = WebpackAutoCleanBuildPlugin;
