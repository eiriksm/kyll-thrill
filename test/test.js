/*global c, chai, describe, it */
'use strict';

var assert = chai.assert;

describe('App functionality', function(){
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
});

// TODO: Test redirect. Or just make it better.
