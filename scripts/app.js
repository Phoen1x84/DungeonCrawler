// create hero constructor
var createCharacter = function(name, health, strength) {
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
var attackValue = function(character) {
    if (character != undefined) {
        var atkMaxDmg = Math.max(character.strength);
        var atkDmg = Math.round(Math.random() * character.strength);

        if (atkDmg == atkMaxDmg) {
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
  }
  else {
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
var levelUp = function(character) {
    if (character) {
        debugger;
        return character.strength += 10;
    }
};



// global hero namespace
var hero;
var heroCreateEvent = document.getElementById('create-hero');

var monster = new createCharacter('monster');

heroCreateEvent.addEventListener('click', function() {
    if (hero == null || hero == undefined) {
        hero = new createCharacter();
        // console.log('Your hero name is ' + hero.name,
        //               'your attack damage is ' + hero.strength,
        //                 'your health is ' + hero.health);
        console.log('name: ' + hero.name);
        console.log('health: ' + hero.health);
        console.log('strength: ' + hero.strength);
    }
});

// attack events
var attackEvent = document.getElementById('hero-attack');

attackEvent.addEventListener('click', function() {

    // hero will always attack first calculate the monster health first
    // then carry out the monster attack
    var heroAttack = attackValue(hero);
    var monsterAttack = attackValue(monster);

    if (monster.health > 0) {
      // hero attacks the monster first
      calcHits(monster, heroAttack);
      checkHealth(monster);
    }
    if (hero.health > 0 && monster.health > 0) {
      // if the monster is not dead the monster attacks the hero
      calcHits(hero, monsterAttack);
      checkHealth(hero);
    }

    console.log('hero attack ' + heroAttack);
    console.log('monster attack ' + monsterAttack);

});
