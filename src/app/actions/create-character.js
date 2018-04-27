export default class CreateCharacter {
    constructor(name, health, strength) {
        this.name = name || generateName();
        this.health = 10;
        this.maxHealth = Math.max(this.health);
        this.strength = 10;
        this.level = 1;
        this.initiative = 1;
    }

    generateName() {
        const names = [
            'Odin',
            'Thor',
            'Sniffles',
            'Kitopants'
        ];
        return names[Math.floor(Math.random() * names.length)];
    }
};