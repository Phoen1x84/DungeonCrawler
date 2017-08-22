var assert = require('assert');
var c = require('./../scripts/constructors/createCharacter.js');

describe('create character', function() {
  describe('create character method', function() {
    it('should have a create character method', function() {
      assert.equal(typeof c, 'function');
    });
  });
});
