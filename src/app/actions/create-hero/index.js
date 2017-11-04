var player = require('../../player');
var CreateCharacter = require('../../constructors/create-character');

// global hero namespace
var heroCreateEvent = document.getElementById('create-hero');

player.monster = new CreateCharacter('monster');

heroCreateEvent.addEventListener('click', function () {
    player.hero = new CreateCharacter();
    debugger;
    console.log(`name: ${player.hero.name}
    health: ${player.hero.health}
    strength: ${player.hero.strength}
    initiative: ${player.hero.initiative}
    level: ${player.hero.level}`);

});

module.exports = heroCreateEvent;