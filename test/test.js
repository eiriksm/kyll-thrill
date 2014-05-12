/*global c, chai, describe, it */
(function() {
  'use strict';
  var assert = chai.assert;

  describe('App functionality', function() {
    it('Should be appended a couple of posts in the DOM', function() {
      assert.equal(c.childNodes[0].childNodes.length, 2);
    });
    it('Should happen something when we click one of the posts', function(done) {
      var evt;
      var el = c.childNodes[0].childNodes[0].childNodes[0].childNodes[0];
      if (document.createEvent) {
        evt = document.createEvent("MouseEvents");
        evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      }
      if (evt) {
        el.dispatchEvent(evt);
      }
      else {
        el.click();
      }
      // Do this async, so we are sure the event triggers.
      setTimeout(function() {
        assert.equal('/blog/2014/03/21/power-of', window.location.pathname);
        done();
      }, 10);
    });

    it('Should do something exciting when we are supposed to be redirected', function(done) {
      var url = '/blog/2014/03/21/power-of';
      window.localStorage.setItem('redirect', url);
      m.route('/');

      // Just trigger some random crap to increase coverage :)
      window.scrollBy(0, 500);
      window.onScrollFunction();

      // Wait a little, see that we get redirected.
      setTimeout(function() {
        assert.equal(url, window.location.pathname);
        done();
      }, 100);
    });
  });

  describe('Disqus stuff', function () {
    it('Should add disqus widget if defined', function(done) {
      m.route('/');
      window.disqus_shortname = 'kyllthrill';
      window.disqus_dry_run = true;
      m.route('/blog/2014/03/21/power-of');
      setTimeout(function() {
        assert.equal(window.appendedScript.indexOf('kyllthrill.disqus.com') > 1, true);
        done();
      }, 100);
    });
  });

}());
