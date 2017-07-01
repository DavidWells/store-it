const getCookie = require('./cookie').getCookie
const parse = require('./utils/parse')

module.exports = function getItemSyncFactory(hasLocalStorage) {
  return function getItemSync(key) {
    console.log('sync')
    if (typeof window === 'undefined') return false
    if (hasLocalStorage) {
      return parse(window.localStorage.getItem(key))
    }
    // no localStorage support. Fallback to cookie
    try {
      return parse(getCookie(key))
    } catch (e) {
      // no cookie support. Fallback to window
      return (window[key]) ? (window[key]) : null
    }
  }
}