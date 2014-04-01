if (typeof(c) === 'undefined') {
  // Add the url to localstorage so we can redirect.
  if (window && window.localStorage) {
    localStorage.setItem('redirect', window.location.pathname);
  }
  if (!baseUrl || baseUrl === '') {
    var baseUrl = '/';
  }
  window.location.href = baseUrl;
}
