const getCookie = require('./cookie').getCookie
const parse = require('./utils/parse')

module.exports = function getItemFactory(forageInstance) {
  return function getItem(key, callback) {
    if (typeof window === 'undefined') return false
    if (forageInstance) {
      if (callback) {
        return forageInstance.getItem(key, callback)
      }
      // return promise
      return forageInstance.getItem(key)
    }
    // no localForage support. Fallback to cookie
    try {
      const value = parse(getCookie(key))
      if (callback) {
        return callback(value)
      }
      // if callback return with callback else return Promise
      return Promise.resolve(value)
    } catch (e) {
      // Cookies failed use window.var
      const value = window[key]
      if (callback) {
        return callback(value)
      }
      return Promise.resolve(value)
    }
  }
}