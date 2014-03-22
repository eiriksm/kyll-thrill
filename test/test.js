/*global c, chai, describe, it */
'use strict';

var assert = chai.assert;

describe('appyo', function(){
  it('Should be appended a couple of posts in the DOM', function() {
    assert.equal(c.childNodes[0].childNodes.length, 2);
  });
});