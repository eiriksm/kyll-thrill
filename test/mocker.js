function mock(win) {
  win.appUrls = [
    {url: '/blog/2014/03/21/power-of', title: 'All the power of jekyll', date: '21 Mar 2014'},
    {url: '/blog/2014/03/21/introducing-kyll-thrill', title: 'Introducing kyll-thrill', date: '21 Mar 2014'}
  ];
  win.baseUrl = '';
  win.disqus_shortname = 'kyllthrill';
  win.disqus_dry_run = true;
  // This is bad, but makes the tests pass.
  var doc = win.document;
  doc.write('<div id="content"></div>');
  doc.write('<div class="site-title"></div>');
  doc.write('<footer></footer>');
}

module.exports = mock;
