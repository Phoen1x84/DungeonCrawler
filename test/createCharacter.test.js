var assert = require('assert');
var should = require('chai').should();
var createCharacter = require('./../src/app/constructors/create-character/index.js');

describe('create character', function () {
  describe('create character function', function () {
    it('should be a function', function () {
      createCharacter.should.be.a('function');
    });
    it('should accept an argument name', function() {
      createCharacter.should.have.property('name');
    });
    describe('when invoked without name parameter', function () {
      var hero = new createCharacter();
      it('should generate a new character object', function () {
        hero.should.be.a('object');
      });
      it('should have attributes', function() {
        hero.should.have.property('name');
        hero.should.have.property('health');
        hero.should.have.property('maxHealth');
        hero.should.have.property('strength');
        hero.should.have.property('level');
        hero.should.have.property('initiative');
      });
    });
    describe('when invoked with a name parameter', function() {
      var hero = new createCharacter('Horus');
      it('should generate a new chracter object', function() {
        hero.should.be.a('object');
      });
      it('should create a character with the name attribute Horus', function() {
        hero.should.have.property('name') === 'Horus';
      });
    });
  });
});