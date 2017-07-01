const localforage = require('localforage')

module.exports = function localForageSupported() {
  const { INDEXEDDB, WEBSQL, LOCALSTORAGE, supports } = localforage
  return supports(INDEXEDDB) || supports(WEBSQL) || supports(LOCALSTORAGE)
}