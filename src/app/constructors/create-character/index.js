// create hero constructor
// create character es6 example
class CreateCharacter {
    constructor(name) {    
      this.name = name || this.generateName(); // this.name will fail as this is now its own function
      this.health = 10;
      this.maxHealth = Math.max(this.health);
      this.strength = 10;
      this.level = 1;
      this.initiative = 1;      
    };
  };

  module.exports = CreateCharacter;