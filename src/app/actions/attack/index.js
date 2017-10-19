var player = require('../../player');

// calculate hits
var calcHits = (character, attackValue) => {
    var characterObj;
    for (var i in character) {
        characterObj = true;
    }

    if (characterObj && attackValue) {
        return character.health = character.health - attackValue;
    } else {
        throw 'character argument is ' + character + ' and attack value is ' + attackValue;
    }
};



// character health check
var checkHealth = character => {
    if (character.health <= 0) {
        console.log(`${character.name} has died!`);
    }
};

// hero attack
var attack = character => {

    if (character != null) {
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

// attack events
var attackAction = document.getElementById('hero-attack');

attackAction.addEventListener('click', function () {
    // hero will always attack first calculate the monster health first
    // then carry out the monster attack
    var heroAttack = attack(player.hero);
    var monsterAttack = attack(player.monster);
    
    if (player.monster.health > 0) {
        // hero attacks the monster first
        calcHits(player.monster, heroAttack);
        checkHealth(player.monster);
    }
    else if (player.hero.health > 0 && player.monster.health > 0) {
        // if the monster is not dead the monster attacks the hero
        calcHits(player.hero, monsterAttack);
        checkHealth(player.hero);
    }

    console.log('hero attack ' + heroAttack);
    console.log('monster attack ' + monsterAttack);

});

module.exports = attackAction;