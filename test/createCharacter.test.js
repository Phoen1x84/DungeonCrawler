var assert = require('assert');
var should = require('chai').should();
var expect = require('chai').expect;
var createCharacter = require('./../src/app/constructors/create-character/index.js');

describe('create character', function () {
  var hero;

  beforeEach(function () {
    hero = new createCharacter();
  });

  afterEach(function() {
    hero = undefined;
  })

  describe('function', function () {
    it('should be a function', function () {
      createCharacter.should.be.a('function');
    });
  });

  describe('generate random name method', function () {
    it('should return a random name that is a string value', function () {
      var generateName = createCharacter.prototype.generateName();
      generateNameMethod.should.be.a('string');
    });
  });

  describe('character attributes', function () {
    it('should have attributes', function () {
      hero.should.have.property('name');
      hero.should.have.property('health');
      hero.should.have.property('maxHealth');
      hero.should.have.property('strength');
      hero.should.have.property('level');
      hero.should.have.property('initiative');
    });
  });
});
