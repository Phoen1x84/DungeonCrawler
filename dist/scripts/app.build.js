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

// hero attack
var attack = function(character) {
  if (character != undefined) {
    var atkMaxDmg = Math.max(character.strength);
    var atkDmg = Math.round(Math.random() * character.strength);

    if (atkDmg === atkMaxDmg) {
      // critical attack does extra damage
      return atkDmg;
    } else {
      // basic attack damage lowest number to highest number - 1
      return atkDmg + 5;
    }
  } else {
    throw 'hero is undefined or has not been created.';
  }
};

// calculate hits
var calcHits = function(character, attackValue) {

  if (character && attackValue) {
    return character.health = character.health - attackValue;
  } else {
    throw 'character argument is ' + character + ' and attack value is ' + attackValue;
  }
};

// character health check
var checkHealth = function(character) {
  if (character.health <= 0) {
    alert(character.name + ' is dead, try again');
  }
};

// hero inventory

// level up
var levelUp = function(stats) {
  if (stats) {
    return (
      /*
        a class // race modifier could be added to this leveling system
        to give a different leveling buff / debuff
      */
      stats.strength += Math.round(stats.level / 0.5),
      stats.maxHealth += Math.round(stats.level / 0.5),
      stats.level += 1
    );
  }
};



// global hero namespace
var hero;
var heroCreateEvent = document.getElementById('create-hero');

var monster = new CreateCharacter('monster');

heroCreateEvent.addEventListener('click', function() {
  if (hero == null || hero == undefined) {
    hero = new CreateCharacter();
    // console.log('Your hero name is ' + hero.name,
    //               'your attack damage is ' + hero.strength,
    //                 'your health is ' + hero.health);
    console.log('name: ' + hero.name);
    console.log('health: ' + hero.health);
    console.log('strength: ' + hero.strength);
    console.log('level: ' + hero.level);
  }
});

// attack events
var attackAction = document.getElementById('hero-attack');

attackAction.addEventListener('click', function() {

  // hero will always attack first calculate the monster health first
  // then carry out the monster attack
  var heroAttack = attack(hero);
  var monsterAttack = attack(monster);

  if (monster.health > 0) {
    // hero attacks the monster first
    calcHits(monster, heroAttack);
    checkHealth(monster);
  }
  else if (hero.health > 0 && monster.health > 0) {
    // if the monster is not dead the monster attacks the hero
    calcHits(hero, monsterAttack);
    checkHealth(hero);
  }

  console.log('hero attack ' + heroAttack);
  console.log('monster attack ' + monsterAttack);

});
