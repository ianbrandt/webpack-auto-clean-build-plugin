/*
 * Copyright (c) (2017) - Aikar
 *  http://aikar.co
 *  @license MIT
 */
export default class HashCleanWebpackPlugin {
  apply (compiler) {
    compiler.plugin('after-emit', (compilation, callback) => {
      console.log('To Do!')
      callback()
    })
  }
}
