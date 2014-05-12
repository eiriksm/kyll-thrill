var c = document.getElementById('content');
var list = {
  controller: function() {
    if (window && window.localStorage && window.localStorage.getItem('redirect')) {
      var u = window.localStorage.getItem('redirect');
      window.localStorage.clear('redirect');
      setTimeout(function() {
        m.route(u);
      }, 10);
    }
    this.list = [];
    for (var i = 0; i < appUrls.length; i++) {
      this.list.push(appUrls[i]);
    }
  },
  view: function(ctrl) {
    return m('div.content', [
      ctrl.list.map(function(post) {
        return m('div.post', [
          m('a[href="' + baseUrl + post.url + '"].postlink', {config: m.route}, [
            m('h2', [
              m('span.readmore', '>'),
              m('span.title', post.title)
            ]),
            m('span.date', post.date)
          ])
        ]);
      })
    ]);
  }
};
var post = {
  controller: function() {
    this.year = m.route.param('year');
    this.month = m.route.param('month');
    this.day = m.route.param('day');
    this.file = m.route.param('file');
    this.text = '';
    var ctrl = this;
    m.request({
      method: 'GET',
      url: baseUrl + '/blog/' + this.year + '/' + this.month + '/' + this.day + '/' + this.file + '/index.html',
      deserialize: function(v) {
        return v;
      }
    })
    .then(function(data) {
      ctrl.text = data;
    });
  },
  view: function(ctrl) {
    if (typeof(disqus_shortname) != 'undefined') {
      var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
      dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
      /* istanbul ignore else */
      if (typeof(disqus_dry_run) != 'undefined') {
        window.appendedScript = dsq.src;
      }
      else {
        document.getElementsByTagName('head')[0].appendChild(dsq);
      }
    }
    return m('div.content', [
      m('div.post-full', m.trust(ctrl.text))
    ]);
  }
};
m.route.mode = 'pathname';
var routeConf = {};
routeConf['/'] = list;
routeConf[baseUrl + '/'] = list;
routeConf['/blog/:year/:month/:day/:file'] = post;
routeConf['/blog/:year/:month/:day/:file/'] = post;
routeConf[baseUrl + '/blog/:year/:month/:day/:file'] = post;
routeConf[baseUrl + '/blog/:year/:month/:day/:file/'] = post;
m.route(c, baseUrl + '/', routeConf);

// Do some parallax stuff.
var body = document.body;
var html = document.documentElement;
var height = Math.max(body.scrollHeight, body.offsetHeight,
    html.clientHeight, html.scrollHeight, html.offsetHeight);
onScrollFunction = function() {
  height = Math.max(body.scrollHeight, body.offsetHeight,
    html.clientHeight, html.scrollHeight, html.offsetHeight);
  var scroll = window.scrollY;
  var header = document.getElementsByClassName('site-title')[0];
  var totalScroll = window.innerHeight / 6;
  header.style.opacity = 1 - (scroll / totalScroll);
  /* istanbul ignore next */
  if (scroll >= (height - window.innerHeight - 100)) {
    document.getElementsByTagName('footer')[0].setAttribute('style',
      'opacity: ' + (1 + ((scroll - (height - window.innerHeight)) / 100))
    );
  }
};

window.onscroll = onScrollFunction;
