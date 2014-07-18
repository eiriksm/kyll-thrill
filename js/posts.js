function init(window) {
  if (typeof(window.c) === 'undefined') {
    // Add the url to localstorage so we can redirect.
    if (window && window.localStorage) {
      window.localStorage.setItem('redirect', window.location.pathname);
    }
    if (typeof(window.baseUrl) === 'undefined' || window.baseUrl === '') {
      window.baseUrl = '/';
    }
    window.location.href = window.baseUrl;
  }
}
init(window);
