'use strict';

var expect = require('chai').expect;
var fs = require('fs');
var mkdirp = require('mkdirp');
var path = require('path');
var rmRf = require('rimraf');
var webpack = require('webpack');

var Plugin = require('../index.js');

var OUTPUT_DIR = path.join(__dirname, '../tmp');

describe('Plugin', function () {

	beforeEach(function (done) {

		rmRf(OUTPUT_DIR, done)
	});

	it('is invoked without error', function (done) {

		var webpackConfig = {
			entry: path.join(__dirname, 'fixtures/main.js'),
			output: {
				path: OUTPUT_DIR,
				filename: '[name]-[chunkhash].js'
			},
			plugins: [
				new Plugin()
			]
		};

		mkdirp(OUTPUT_DIR, function (err) {

			expect(err).to.be.null;

			webpack(webpackConfig, function (err, stats) {

				expect(err).to.be.null;
				expect(stats.hasErrors()).to.be.false;

				fs.readdir(OUTPUT_DIR, function (err, files) {

					files.forEach(function (file) {

						console.log(file);
					});
				});

				done()
			})
		})
	});
});
