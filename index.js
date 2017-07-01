const localforage = require('localforage')
const localStorageSupported = require('./utils/localStorageSupported')
const localForageSupported = require('./utils/localForageSupported')

module.exports = function initialize(config) {
  const defaults = {
    name: 'store-it'
  }
  const configuration = config || {}
  const settings = Object.assign({}, defaults, configuration)
  const hasLocalForage = localForageSupported()
  const hasLocalStorage = localStorageSupported()

  let forageInstance
  if (hasLocalForage) {
    forageInstance = localforage.createInstance(settings)
  }
  return {
    getItem: require('./getItem')(forageInstance),
    getItemSync: require('./getItemSync')(hasLocalStorage),
    getCookie: require('./cookie').getCookie,
    removeItem: require('./removeItem')(forageInstance),
    removeItemSync: require('./removeItemSync')(hasLocalStorage),
    removeCookie: require('./cookie').removeCookie,
    setItem: require('./setItem')(forageInstance),
    setItemSync: require('./setItemSync')(hasLocalStorage),
    setCookie: require('./cookie').setCookie,
  }
}
