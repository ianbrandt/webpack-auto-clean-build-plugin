/*
 * Copyright (c) (2017) - Aikar
 *
 *  http://aikar.co
 *
 *  @license MIT
 *
 */

export default function WebpackAutoCleanBuildPlugin () {
  const apply = (compiler) => {
    compiler.plugin('after-emit', (compilation, callback) => {
      for (let filename in compilation.assets) {
        console.log('[debug] ' + filename)
      }
      callback()
    })
  }
  return {
    apply
  }
}
