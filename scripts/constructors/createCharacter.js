// create hero constructor
var createCharacter = function(name, health, strength) {
    this.name = name || generateName();
    this.health = health || 10;
    this.strength = strength || 10;
};
