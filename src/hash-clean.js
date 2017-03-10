/*
 * Copyright (c) (2017) - Aikar
 *  http://aikar.co
 *  @license MIT
 */
export default function HashCleanWebpackPlugin () {
  const apply = (compiler) => {
    compiler.plugin('after-emit', (compilation, callback) => {
      callback()
    })
  }
  return {
    apply
  }
}
