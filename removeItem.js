const removeCookie = require('./cookie').removeCookie
const parse = require('./utils/parse')

module.exports = function removeItemFactory(forageInstance) {
  return function removeItem(key, callback) {
    console.log('removeItem', key)
    if (typeof window === 'undefined') return false

    if (forageInstance) {
      if (callback) {
        return forageInstance.removeItem(key, callback)
      }
      // return promise
      return forageInstance.removeItem(key)
    }

    // no localForage support. Fallback to cookie
    try {
      removeCookie(key)
      if (callback) {
        return callback(true)
      }
      // return promise
      return Promise.resolve(true)
    } catch (e) {
      // no Cookies support. Fallback to window
      window[key] = null
      if (callback) {
        return callback(true)
      }
      // return promise
      return Promise.resolve(true)
    }
  }
}