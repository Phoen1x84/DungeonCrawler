// create character es6 example
// class CreateCharacter {
//   constructor(name, health, strength) {
//     this.name = name || generateName();
//     this.health = health || 10;
//     this.strength = strength || 10;
//   };
//
//   generateName() {
//     var names = [
//         'Odin',
//         'Thor',
//         'Sniffles',
//         'Kitopants'
//     ];
//     return names[Math.floor(Math.random() * names.length)];
//   };
// };

// create hero constructor
var CreateCharacter = function(name, health, maxHealth, strength) {
  this.name = name || generateName();
  this.health = health || 10;
  this.maxHealth = Math.max(this.health);
  this.strength = strength || 10;
  this.level = 1;

  // name generator
  function generateName() {
    var names = [
      'Odin',
      'Thor',
      'Sniffles',
      'Kitopants'
    ];
    return names[Math.floor(Math.random() * names.length)];
  };
};
