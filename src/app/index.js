// create hero constructor
// create character es6 example
const CreateCharacter = function(name) {
    this.name = name || generateName();
    this.health = 10;
    this.maxHealth = Math.max(this.health);
    this.strength = 10;
    this.level = 1;
    this.initiative = 1;
};

// name generator
const generateName = () => { 
  let names = [
    'Odin',
    'Thor',
    'Sniffles',
    'Kitopants' 
  ];
  return names[Math.floor(Math.random() * names.length)];
};

// hero attack
const attack = character => {
  if (character != undefined) {
    var atkMaxDmg = Math.max(character.strength);
    var atkDmg = Math.round(Math.random() * character.strength);

    if (atkDmg === atkMaxDmg) {
      // critical attack does extra damage
      return atkDmg + 5;
    } else {
      // basic attack damage lowest number to highest number - 1
      return atkDmg;
    }
  } else {
    throw 'hero is undefined or has not been created.';
  }
};

// calculate hits
const calcHits = function (character, attackValue) {

  if (character && attackValue) {
    return character.health = character.health - attackValue;
  } else {
    throw 'character argument is ' + character + ' and attack value is ' + attackValue;
  }
};

// character health check
const checkHealth = character => {
  if (character.health <= 0) {
    console.log(`${character.name} has died!`);
  }
};

// hero inventory

// level up
const levelUp = stats => {
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


// attack order using initiative
const attackOrder = character => {
  return character.initiative;
};


// global hero namespace
var hero;
var heroCreateEvent = document.getElementById('create-hero');

var monster = new CreateCharacter('monster');

heroCreateEvent.addEventListener('click', function () {
  if (hero == null || hero == undefined) {
    hero = new CreateCharacter();
    console.log(`name: ${hero.name}
    health: ${hero.health}
    strength: ${hero.strength}
    initiative: ${hero.initiative}
    level: ${hero.level}`);
  }
});

// attack events
var attackAction = document.getElementById('hero-attack');

attackAction.addEventListener('click', function () {

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