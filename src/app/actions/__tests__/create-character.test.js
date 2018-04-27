import CreateCharacter from "./../create-character.js";

describe(CreateCharacter, () => {

    const player = new CreateCharacter('Odin');

    it('create character is a function', () => {
        expect(typeof CreateCharacter).toBe('function');
    });

    it('should have a generateName method', () => {
        expect(typeof player.generateName).toBe('function');
    });

    it('a character should have a name property', () => {
        expect(player).toHaveProperty('name', 'Odin');
    });

    it('a character should have a health property', () => {
        expect(player).toHaveProperty('health', 10);
    });

    it('a character should have a max health property', () => {
        expect(player).toHaveProperty('maxHealth', 10);
    });

    it('a character should have a strength property', () => {
        expect(player).toHaveProperty('strength', 10);
    });

    it('a character should have a level property', () => {
        expect(player).toHaveProperty('level', 1);
    });

    it('a character should have a initiative property', () => {
        expect(player).toHaveProperty('initiative', 1);
    });
});