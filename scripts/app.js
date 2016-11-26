// create hero factory
var createHero = function(name, health, strength) {
    this.name = name || nameGenerator();
    this.health = health || 10;
    this.strength = strength || 10;
};

// name generator
var nameGenerator = function() {
    var names = [
        'Odin',
        'Thor',
        'Sniffles',
        'Kitopants'
    ];
    var generatedName = Math.floor(Math.random() * names.length);
    return names[generatedName];
};

// hero attack
var heroAttack = function(hero) {
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

// create monster

// monster attack

// remove monster (when monster is defeated to be memory efficient)

// global hero namespace
var hero;
var heroCreateEvent = document.getElementById('create-hero');

heroCreateEvent.addEventListener('click', function() {
    hero = new createHero();
    // console.log('Your hero name is ' + hero.name,
    //               'your attack damage is ' + hero.strength,
    //                 'your health is ' + hero.health);
    console.log('name: ' + hero.name);
    console.log('health: ' + hero.health);
    console.log('strength: ' + hero.strength);
});
