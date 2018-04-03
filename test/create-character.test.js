const createCharacter = require('./../src/app/constructors/create-character/index.js');

describe('CreateCharacter', () => {
    const player = new createCharacter('Odin');

    test('create character is a function', () => {
        expect(typeof createCharacter).toBe('function');
    });
    
    test('a character should have a name property', () => {
        expect(player).toHaveProperty('name', 'Odin');
    });
    
    test('a character should have a health property', () => {
        expect(player).toHaveProperty('health', 10);
    });
    
    test('a character should have a max health property', () => {
        expect(player).toHaveProperty('maxHealth', 10);
    });
    
    test('a character should have a strength property', () => {
        expect(player).toHaveProperty('strength', 10);
    });
    
    test('a character should have a level property', () => {
        expect(player).toHaveProperty('level', 1);    
    });
    
    test('a character should have a initiative property', () => {
        expect(player).toHaveProperty('initiative', 1);
    });
});
