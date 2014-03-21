var c = document.getElementById('content');
var list = {
  controller: function() {
    this.list = [];
    for (var i = 0; i < appUrls.length; i++) {
      this.list.push(appUrls[i]);
    }
  },
  view: function(ctrl) {
    //c.innerHTML = '';
    return m('div.content', [
      ctrl.list.map(function(post, index) {
        return m('div.post', [
          m('h3', [
            m('a[href="' + post.url + '"].postlink', {config: m.route}, [
              m('span.date', post.date + ' - '),
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
      url: '/blog/' + this.year + '/' + this.month + '/' + this.day + '/' + this.file + '/index.html',
      deserialize: function(v) {
        return v;
      }
    })
    .then(function(data) {
      ctrl.text = data;
    });
  },
  view: function(ctrl) {
    return m('div.content', [
      m('div.post-full', m.trust(ctrl.text))
    ]);
  }
};
m.route.mode = 'hash';
m.route(c, "/home", {
  "/home": list,
  '/blog/:year/:month/:day/:file': post
});
