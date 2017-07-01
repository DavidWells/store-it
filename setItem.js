const setCookie = require('./cookie').setCookie

module.exports = function setItemFactory(forageInstance) {
  console.log('forageInstance', forageInstance)
  return function setItem(key, value, callback) {
    if (typeof window === 'undefined') return false
    console.log('forageInstance in func', forageInstance)
    if (forageInstance) {
      if (callback) {
        forageInstance.setItem(key, value, callback)
      }
      // return promise
      return forageInstance.setItem(key, value)
    }
    // no localForage support. Fallback to cookie
    try {
      setCookie(key, value)
      if (callback) {
        return callback(value)
      }
      // default return promise
      return Promise.resolve(value)
    } catch (e) {
      // Cookies failed set window.var
      window[key] = value
      return (callback) ? callback(value) : Promise.resolve(value)
    }
  }
}
