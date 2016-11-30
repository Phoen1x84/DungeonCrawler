// create hero factory
var createHero = function(name, health, strength) {
    this.name = name || generateName();
    this.health = health || 10;
    this.strength = strength || 10;
};

// name generator
var generateName = function() {
    var names = [
        'Odin',
        'Thor',
        'Sniffles',
        'Kitopants'
    ];
    return names[Math.floor(Math.random() * names.length)];
};

// hero attack
var heroAttackValue = function(hero) {
    if (hero != undefined) {
        var atkMaxDmg = Math.max(this.hero.strength);
        var atkDmg = Math.round(Math.random() * this.hero.strength);

        if (atkMaxDmg != atkDmg) {
            // basic attack damage lowest number to highest number - 1
            return atkDmg;
        } else {
            // critical attack does extra damage
            return atkDmg + 5;
        }
    } else {
        throw 'hero is undefined or has not been created.';
    }
};

// hero inventory

// level up
var levelUp = function(){

};

// create monster
var createMonster = function(){
  // TODO: create hero and create monster are nearly the same
  // abstract these factory functions into character, attributes functions
  this.name = "monster";
  this.health = 10;
  this.strength = 10;
};
// monster attack

// remove monster (when monster is defeated to be memory efficient)

// global hero namespace
var hero;
var heroCreateEvent = document.getElementById('create-hero');

var monster = new createMonster();

heroCreateEvent.addEventListener('click', function() {
    hero = new createHero();
    // console.log('Your hero name is ' + hero.name,
    //               'your attack damage is ' + hero.strength,
    //                 'your health is ' + hero.health);
    console.log('name: ' + hero.name);
    console.log('health: ' + hero.health);
    console.log('strength: ' + hero.strength);
});

var attackEvent = document.getElementById('hero-attack');

attackEvent.addEventListener('click', function(){

    // testing hero nad monster stuff works
    var heroAttackTest = heroAttackValue(hero);
    var monsterAttackTest = heroAttackValue(monster);

      console.log('hero attack ' + heroAttackTest);
      console.log('monster attack ' + monsterAttackTest);

});
