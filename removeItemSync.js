const removeCookie = require('./cookie').removeCookie

module.exports = function removeItemSyncFactory(hasLocalStorage) {
  return function removeItemSync(key) {
    console.log('removeItemSync')
    if (typeof window === 'undefined') return false
    if (hasLocalStorage) {
      return window.localStorage.removeItem(key)
    }
    // no localStorage support. Fallback to Cookie
    try {
      removeCookie(key)
    } catch (e) {
      // no Cookie support. Fallback to window
      window[key] = null
    }
    return null
  }
}