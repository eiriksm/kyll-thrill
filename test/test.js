/*global c, describe, it */
(function() {
  'use strict';
  var chai = require('chai');
  var assert = chai.assert;
  var kt = require('../js/src');
  require('./mocker')(window);
  kt(window);
  var c = window.c;
  var m = window.m;

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
        assert.equal('/blog/2014/03/21/power-of', m.route());
        done();
      }, 100);
    });

    it('Should do something exciting when we are supposed to be redirected', function(done) {
      var url = '/blog/2014/03/21/power-of';
      window.localStorage.setItem('redirect', url);
      m.route('/');

      // Just trigger some random crap to increase coverage :)
      window.scrollBy(0, 500);
      window.onscroll();

      // Wait a little, see that we get redirected.
      setTimeout(function() {
        assert.equal(url, m.route());
        done();
      }, 100);
    });
  });

  describe('Disqus stuff', function () {
    it('Should add disqus widget if defined', function(done) {
      m.route('/');
      m.route('/blog/2014/03/21/power-of');
      setTimeout(function() {
        var s = window.document.getElementsByTagName('script')[0];
        assert.equal(s.src, 'http://kyllthrill.disqus.com/embed.js');
        done();
      }, 10);
    });
  });

  describe('Posts init', function() {
    it('Should do something', function() {
      var mw = {location: {}};
      init(mw);
      assert.equal(mw.location.href, '/');
      var val;
      mw.localStorage = {
        setItem: function(k, v) {
          val = v;
        }
      };
      mw.location.pathname = 'mock';
      init(mw);
      assert.equal(val, 'mock');
      mw.baseUrl = 'mocktest';
      init(mw);
      assert.equal(mw.location.href, 'mocktest');
    });
  });

}());
