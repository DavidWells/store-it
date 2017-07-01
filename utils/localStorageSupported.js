module.exports = function localStorageSupported() {
  if (typeof window === 'undefined') return false
  if ('localStorage' in window) {
    try {
      if (typeof localStorage === 'undefined' || typeof JSON === 'undefined') {
        return false
      }
      // test for safari private
      localStorage.setItem('CHECK_PRIVATE_SAFARI', '1')
      localStorage.removeItem('CHECK_PRIVATE_SAFARI')
    } catch (err) {
      return false
    }
    return true
  }
}
