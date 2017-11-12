// create hero constructor
// create character es6 example
class CreateCharacter {
    constructor(name) {    
      this.name = name || this.generateName();
      this.health = 10;
      this.maxHealth = Math.max(this.health);
      this.strength = 10;
      this.level = 1;
      this.initiative = 1;      
    };
  
    generateName() {    
      const names = [
        'Odin', 
        'Thor',
        'Sniffles',
        'Kitopants' 
      ];
      return names[Math.floor(Math.random() * names.length)];
    };
  };

  module.exports = CreateCharacter;