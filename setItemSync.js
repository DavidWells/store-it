const setCookie = require('./cookie').setCookie
const parse = require('./utils/parse')

module.exports = function setItemSyncFactory(localStorageSupport) {
  return function setItemSync(key, value) {
    if (typeof window === 'undefined') return false
    if (localStorageSupport) {
      const item = JSON.stringify(value)
      window.localStorage.setItem(key, item)
      return parse(item)
    }
    // no localStorage support. Fallback to cookie
    try {
      setCookie(key, value)
    } catch (e) {
      // no cookie support. Fallback to window
      window[key] = value
    }
    return value
  }
}