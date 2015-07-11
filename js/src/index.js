var m = require('mithril');
function init(win) {
  'use strict';
  var appUrls = win.appUrls;
  win.c = document.getElementById('content');
  var list = {
    controller: function() {
      if (win && win.localStorage && win.localStorage.getItem('redirect')) {
        var u = win.localStorage.getItem('redirect');
        win.localStorage.clear('redirect');
        setTimeout(function() {
          m.route(u);
        }, 10);
      }
      this.list = [];
      for (var i = 0; i < appUrls.length; i++) {
        this.list.push(appUrls[i]);
      }
      this.navigate = function(el) {
        var url = el.getAttribute('href');
        m.route(url, {}, true);
      };
    },
    view: function(ctrl) {
      return m('div.content', [
        ctrl.list.map(function(post) {
          return m('div.post', [
            m('a[href="' + win.baseUrl + post.url + '"].postlink', { onclick: (function(){ctrl.navigate(this);return false;})}, [
              m('span.date', post.date + ':'),
              m('h2', [
                m('span.title', post.title)
              ])
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
        url: win.baseUrl + '/blog/' + this.year + '/' + this.month + '/' + this.day + '/' + this.file + '/index.html',
        deserialize: function(v) {
          return v;
        }
      })
      .then(function(data) {
        ctrl.text = data;
      });
    },
    view: function(ctrl) {
      if (typeof(win.disqus_shortname) != 'undefined') {
        var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
        dsq.src = '//' + win.disqus_shortname + '.disqus.com/embed.js';
        document.getElementsByTagName('head')[0].appendChild(dsq);
      }
      return m('div.content', [
        m('div.post-full', m.trust(ctrl.text))
      ]);
    }
  };
  m.route.mode = 'pathname';
  var routeConf = {};
  routeConf['/'] = list;
  routeConf[win.baseUrl + '/'] = list;
  routeConf['/blog/:year/:month/:day/:file'] = post;
  routeConf['/blog/:year/:month/:day/:file/'] = post;
  routeConf[win.baseUrl + '/blog/:year/:month/:day/:file'] = post;
  routeConf[win.baseUrl + '/blog/:year/:month/:day/:file/'] = post;
  m.route(win.c, win.baseUrl + '/', routeConf);

  // Do some parallax stuff.
  var body = document.body;
  var html = document.documentElement;
  var height = Math.max(body.scrollHeight, body.offsetHeight,
      html.clientHeight, html.scrollHeight, html.offsetHeight);
  var onScrollFunction = function() {
    height = Math.max(body.scrollHeight, body.offsetHeight,
      html.clientHeight, html.scrollHeight, html.offsetHeight);
    var scroll = win.scrollY;
    var header = document.getElementsByClassName('site-title')[0];
    var totalScroll = win.innerHeight / 6;
    header.style.opacity = 1 - (scroll / totalScroll);
    /* istanbul ignore next */
    if (scroll >= (height - win.innerHeight - 100)) {
      document.getElementsByTagName('footer')[0].setAttribute('style',
        'opacity: ' + (1 + ((scroll - (height - win.innerHeight)) / 100))
      );
    }
  };
  win.onscroll = onScrollFunction;
  win.m = m;
}
module.exports = init;
